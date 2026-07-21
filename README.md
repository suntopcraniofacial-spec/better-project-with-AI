# Suntop Craniofacial & Dental Clinic Website

Professional dental clinic website with appointment booking system for Suntop Dental Clinic in Benin City.

## 🏥 Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **SEO Optimized** - Google Local Business Schema, meta tags, keywords
- **Appointment Booking** - Integrated booking form with validation
- **WhatsApp Integration** - Direct clinic contact via WhatsApp
- **Email Notifications** - Automated booking confirmations and reminders
- **Before & After Gallery** - Showcase patient transformations
- **Testimonials** - Social proof from satisfied patients
- **Multi-branch Support** - Manage two clinic locations

## 📁 Project Structure

```
suntop-dental-clinic-new-project/
├── index.html                    # Home page (main website)
├── index-updated.html            # Updated version with image paths
├── booking-form.html             # Standalone booking form
├── server.js                     # Express.js backend server
├── bookings.json                 # Booking submissions (auto-generated)
├── package.json                  # Node.js dependencies
├── .env.example                  # Environment variables template
├── ASSETS_README.md              # Image setup instructions
├── README.md                     # This file
└── assets/
    └── images/
        └── before-after/         # Before & after photos folder
            ├── transformation-1-before.jpg
            ├── transformation-1-after.jpg
            ├── transformation-2-before.jpg
            ├── transformation-2-after.jpg
            ├── transformation-3-before.jpg
            └── transformation-3-after.jpg
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your email and Twilio credentials
```

### 3. Add Your Images
Follow instructions in `ASSETS_README.md` to add before-and-after photos.

### 4. Start the Server
```bash
npm start
# Server runs on http://localhost:3000
```

## 🔧 Environment Variables

Create a `.env` file with:

```
# Email Configuration (Gmail, SendGrid, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@suntopdental.com

# Twilio Configuration (for WhatsApp - optional)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_FROM=+1234567890

# Server
PORT=3000
NODE_ENV=development
```

## 📸 Adding Images

1. **Prepare your images:**
   - Size: 400px × 600px
   - Format: JPG or PNG
   - File size: Under 200KB

2. **Upload to GitHub:**
   ```bash
   mkdir -p assets/images/before-after
   cp /path/to/your/images.jpg assets/images/before-after/
   git add assets/
   git commit -m "Add before-and-after transformation images"
   git push
   ```

3. **Verify:** Images will display at `/assets/images/before-after/transformation-{n}-{before|after}.jpg`

## 📧 Email Setup

### Gmail (Free)
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in `SMTP_PASS`

### SendGrid
1. Sign up at sendgrid.com
2. Create API key
3. Use `sendgrid` as SMTP_HOST with API key

## 💬 WhatsApp Integration (Optional)

To enable WhatsApp notifications:

1. Sign up at twilio.com
2. Get credentials: Account SID, Auth Token
3. Set up WhatsApp Sandbox
4. Add to `.env`:
   ```
   TWILIO_ACCOUNT_SID=your-sid
   TWILIO_AUTH_TOKEN=your-token
   TWILIO_WHATSAPP_FROM=+1234567890
   ```

## 🌐 Deployment

### Heroku
```bash
# Install Heroku CLI
heroku login
heroku create suntop-dental-clinic
git push heroku feature/website-enhancements:main
```

### Render.com
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

### DigitalOcean / AWS / Others
See deployment guides in `docs/` (to be created)

## 📝 API Endpoints

### POST `/api/bookings`
Submit appointment booking request.

**Request:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phone": "+234-800-000-0000",
  "treatment": "Teeth Whitening",
  "branch": "uselu",
  "date": "2024-08-15",
  "time": "14:00",
  "notes": "I have sensitive teeth",
  "emailReminder": true,
  "reminderTiming": "1_day"
}
```

**Response:**
```json
{
  "ok": true
}
```

## 🎨 Customization

### Update Clinic Info
Edit `index.html`:
- Lines 8-10: Title, description, keywords
- Lines 32-35, 62-68: Clinic addresses
- Lines 508-510: Phone numbers
- Lines 720-737: Branch locations

### Change Colors
Edit CSS variables in `index.html` (lines 93-102):
```css
--primary: #0b1e36;       /* Navy blue */
--accent: #0ea5e9;        /* Sky blue */
--teal-soft: #06b6d4;     /* Teal */
```

### Update Services
Edit services grid in `index.html` (lines 539-564).

## 🐛 Troubleshooting

### Images not showing
- Check file path: `assets/images/before-after/transformation-{n}-{before|after}.jpg`
- Ensure images are committed to GitHub
- Clear browser cache (Ctrl+Shift+Delete)

### Emails not sending
- Verify `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` in `.env`
- Check firewall/antivirus blocking port 587
- Enable "Less secure apps" for Gmail

### WhatsApp not working
- Verify Twilio credentials
- Ensure Sandbox number is active
- Check phone number format (E.164: +234XXXXXXXXXX)

## 📞 Support

For issues:
1. Check `ASSETS_README.md` for image setup
2. Review `.env.example` for configuration
3. Check server logs: `npm start`

## 📜 License

MIT License - See LICENSE file

## 👥 Contributors

- Suntop Craniofacial & Dental Clinic Team

---

**Last Updated:** July 21, 2026
**Version:** 1.0.0
