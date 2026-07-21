const express = require('express');
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');
function ensureBookingsFile() {
  if (!fs.existsSync(BOOKINGS_FILE)) fs.writeFileSync(BOOKINGS_FILE, '[]');
}
function saveBooking(b) {
  ensureBookingsFile();
  const list = JSON.parse(fs.readFileSync(BOOKINGS_FILE));
  list.push(b);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(list, null, 2));
}

// Configure nodemailer transporter from environment
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
});

async function sendEmail(to, subject, text) {
  if (!process.env.SMTP_HOST || !process.env.EMAIL_FROM) {
    console.log('SMTP not configured; skipping email send');
    return;
  }
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, text });
    console.log('Email sent to', to);
  } catch (err) {
    console.error('Failed to send email', err);
  }
}

// Optional Twilio WhatsApp support (if credentials are provided)
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    const twilio = require('twilio');
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('Twilio client configured');
  } catch (err) {
    console.warn('Twilio package not available or failed to initialize:', err.message);
  }
}

async function sendWhatsApp(from, to, body) {
  if (!twilioClient || !from) {
    console.log('Twilio not configured; skipping WhatsApp send');
    return;
  }
  try {
    const msg = await twilioClient.messages.create({
      from: `whatsapp:${from}`,
      to: `whatsapp:${to}`,
      body,
    });
    console.log('WhatsApp message sent', msg.sid);
  } catch (err) {
    console.error('Failed to send WhatsApp message', err);
  }
}

function computeAppointmentDate(dateStr, timeStr) {
  // dateStr expected YYYY-MM-DD
  const [y, m, d] = (dateStr || '').split('-').map(Number);
  if (!y || !m || !d) return null;
  const appt = new Date(y, m - 1, d);
  if (timeStr) {
    const [hh, mm] = timeStr.split(':').map(Number);
    if (!Number.isNaN(hh)) appt.setHours(hh, mm || 0, 0, 0);
  } else {
    appt.setHours(9, 0, 0, 0);
  }
  return appt;
}

function scheduleEmailReminder(payload) {
  if (!payload.email || !payload.date) return;
  const appt = computeAppointmentDate(payload.date, payload.time);
  if (!appt) return;
  const offsets = { '1_day': 24 * 60, '12_hours': 12 * 60, '2_hours': 2 * 60 };
  const minutesBefore = offsets[payload.reminderTiming] || 24 * 60;
  const reminderAt = new Date(appt.getTime() - minutesBefore * 60 * 1000);
  if (reminderAt <= new Date()) {
    console.log('Reminder time is in the past; skipping schedule');
    return;
  }
  schedule.scheduleJob(reminderAt, () => {
    const subject = 'Appointment reminder — Suntop Dental Clinic';
    const text = `Hi ${payload.fullname}, this is a reminder for your ${payload.treatment} appointment on ${payload.date} ${payload.time || ''}.`;
    sendEmail(payload.email, subject, text).catch(err => console.error(err));
  });
  console.log('Scheduled reminder for', payload.email, 'at', reminderAt.toISOString());
}

// Serve the frontend (booking-form.html should be in repo root)
app.use(express.static(path.join(__dirname)));

app.post('/api/bookings', (req, res) => {
  const payload = req.body || {};
  // minimal server-side validation
  const required = ['fullname', 'email', 'phone', 'treatment', 'branch', 'date'];
  for (const k of required) {
    if (!payload[k]) return res.status(400).json({ error: `${k} is required` });
  }

  payload.submittedAt = new Date().toISOString();
  saveBooking(payload);

  // schedule email reminder if requested
  if (payload.emailReminder) scheduleEmailReminder(payload);

  // optionally send immediate confirmation via WhatsApp using Twilio
  if (process.env.TWILIO_WHATSAPP_FROM && twilioClient) {
    const clinicFrom = process.env.TWILIO_WHATSAPP_FROM;
    const toNumber = payload.phone.replace(/[^0-9+]/g, '');
    const body = `Hi ${payload.fullname}, we received your booking request for ${payload.treatment} on ${payload.date} ${payload.time || ''}. We will contact you to confirm.`;
    sendWhatsApp(clinicFrom, toNumber, body);
  }

  // optionally send immediate confirmation email
  if (process.env.EMAIL_FROM) {
    const subject = 'Suntop Dental Clinic — Booking received';
    const text = `Hi ${payload.fullname},\n\nWe received your booking request for ${payload.treatment} on ${payload.date} ${payload.time || ''}. We will contact you to confirm.\n\nThank you.\nSuntop Dental Clinic`;
    sendEmail(payload.email, subject, text);
  }

  res.status(201).json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Booking API + static server listening on http://localhost:${PORT}`));
