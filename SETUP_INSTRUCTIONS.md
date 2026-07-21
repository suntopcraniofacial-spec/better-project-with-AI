# Suntop Dental Clinic - Website Build Instructions

Welcome! This guide will help you get your dental clinic website up and running.

## 📋 What You Now Have

Your repository includes:

```
├── index.html              # Main homepage (original)
├── index-updated.html      # Updated homepage with real image paths
├── prices.html             # Pricing page with all treatments & rates
├── referral.html           # Referral & commission program page
├── booking-form.html       # Appointment booking form
├── server.js               # Node.js backend server
├── package.json            # Project dependencies
├── .env.example            # Environment variables template
├── README.md               # Full documentation
├── SETUP_INSTRUCTIONS.md   # This file
├── ASSETS_README.md        # Image setup guide
└── assets/
    └── images/
        └── before-after/   # Folder for your before-and-after photos
```

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
```bash
cp .env.example .env
```

Then edit `.env` and add your email configuration (Gmail, SendGrid, etc.):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@suntopdental.com
PORT=3000
```

### Step 3: Add Your Images

1. **Create folder structure** (if not exists):
   ```bash
   mkdir -p assets/images/before-after
   ```

2. **Add your before-and-after photos**:
   - `transformation-1-before.jpg` (Diastema before)
   - `transformation-1-after.jpg` (Diastema after)
   - `transformation-2-before.jpg` (Whitening before)
   - `transformation-2-after.jpg` (Whitening after)
   - `transformation-3-before.jpg` (Braces before)
   - `transformation-3-after.jpg` (Braces after)

3. **Upload to GitHub**:
   ```bash
   git add assets/
   git commit -m "Add before-and-after images"
   git push origin feature/website-enhancements
   ```

### Step 4: Start the Server
```bash
npm start
```

Visit: `http://localhost:3000`

## 🔗 Website Pages

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | `/` or `index.html` | Main landing page with services & testimonials |
| **Prices** | `/prices.html` | Complete pricing list for all treatments |
| **Referral Program** | `/referral.html` | Earn commission by referring patients |
| **Book Now** | `/booking-form.html` | Appointment booking form |

## 💰 Pricing Page (UPDATED!)

Your pricing page now includes all services:
- ✅ Simple Extraction: ₦45,000
- ✅ Surgical Extraction: ₦80,000
- ✅ RCT Front Tooth: ₦45,000
- ✅ RCT Back Tooth: ₦70,000
- ✅ Composite Filling: ₦30,000
- ✅ GIC Filling: ₦35,000
- ✅ Scaling & Polishing: ₦25,000
- ✅ Professional Teeth Whitening: ₦40,000
- ✅ **Orthodontic Braces: ₦1.5M+** (NEW!)
- ✅ **Maxillofacial Surgery: ₦350,000+** (NEW!)

## 🤝 Referral Program (NEW!)

Create referral partnerships with:
- **Spas** - Refer beauty clients for dental care
- **Pharmacies** - Recommend dental treatments to customers
- **Medical Centers** - Cross-refer patients

### Commission Structure:
- **10% Commission** - Base rate for all partners
- **15% Commission** - Premium rate for high-volume referrers (5+ per month)

### How It Works:
1. Partner sends patient name & treatment via WhatsApp
2. Suntop Dental treats the patient
3. Partner receives commission monthly

**Example Commissions:**
- Refer Teeth Whitening (₦40,000) → Earn ₦4,000-6,000
- Refer Braces (₦1.5M) → Earn ₦150,000-225,000

**WhatsApp Numbers for Referrals:**
- Uselu: +234-912-589-0508
- Muritala: +234-916-905-8409

## 🎯 Next: Link Everything Together

Update `index.html` to link to the new pages. Add this to the navigation:
```html
<a href="prices.html">Prices</a>
<a href="referral.html">Refer & Earn</a>
```

Or replace the old `index.html` with `index-updated.html`:
```bash
mv index.html index-old.html
mv index-updated.html index.html
git add .
git commit -m "Update homepage to use real image paths and new pages"
```

## 📧 Email Setup (Required for Booking Confirmations)

### Using Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

### Using SendGrid (Free tier available):
1. Sign up: https://sendgrid.com
2. Create API key
3. Add to `.env`:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   ```

## 🚀 Deploy to Hosting

### Option 1: Heroku (Easy)
```bash
heroku login
heroku create suntop-dental-clinic
git push heroku feature/website-enhancements:main
heroku config:set SMTP_HOST=smtp.gmail.com SMTP_USER=your-email@gmail.com SMTP_PASS=your-password
```

### Option 2: Render.com
1. Push code to GitHub
2. Connect repo to Render
3. Set environment variables in Render dashboard
4. Deploy

### Option 3: DigitalOcean / AWS / VPS
See deployment guides in docs/ folder (to be created)

## 📱 Mobile Responsiveness

✅ All pages are fully responsive for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (under 768px)

## 🔐 Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to GitHub (already in `.gitignore`)
- Use strong SMTP passwords
- Keep API credentials secret
- For production: use environment variables from your hosting provider

## 🐛 Troubleshooting

### Images not showing?
- Check if files exist: `assets/images/before-after/`
- Verify filenames match exactly: `transformation-{1,2,3}-{before,after}.jpg`
- Clear browser cache (Ctrl+Shift+Del)

### Booking form not sending emails?
- Check `.env` file is configured correctly
- Test SMTP credentials on https://www.mxtoolbox.com/
- Verify firewall isn't blocking port 587

### Server not starting?
```bash
# Check if port 3000 is already in use
lsof -i :3000

# Kill process using port 3000
kill -9 <PID>

# Try different port
PORT=3001 npm start
```

## 📞 Quick Reference

**Clinic Branch 1 (Uselu):**
- Address: 127 Uselu, Success Pharmacy Building, Opposite NNPC
- Phone: +234-912-589-0508
- Hours: Mon-Sat 8AM-5PM, Sun Emergency Only

**Clinic Branch 2 (Muritala Muhammad Way):**
- Address: 29 Muritala Muhammad Way, Opposite MTN
- Phone: +234-916-905-8409
- Hours: Mon-Sat 8AM-5PM, Sun Emergency Only

**Referral WhatsApp:**
- Uselu: +234-912-589-0508
- Muritala: +234-916-905-8409

## 📄 File Checklist

- ✅ index.html - Main page
- ✅ index-updated.html - Updated homepage
- ✅ prices.html - Pricing page
- ✅ referral.html - Referral program
- ✅ booking-form.html - Booking form
- ✅ server.js - Backend
- ✅ package.json - Dependencies
- ✅ .env.example - Environment template
- ✅ README.md - Documentation
- ✅ SETUP_INSTRUCTIONS.md - This file
- ✅ ASSETS_README.md - Image guide
- ⏳ assets/images/before-after/ - Add your images here!

## 📈 Next Steps

1. ✅ Add your before-and-after photos
2. ✅ Configure email settings
3. ✅ Test locally: `npm start`
4. ✅ Update navigation links between pages
5. ✅ Deploy to hosting
6. ✅ Share with patients & partners: https://your-domain.com

## 💡 Customization Tips

**Update Clinic Info:**
- Edit phone numbers in `index.html`, `booking-form.html`, `prices.html`, `referral.html`
- Update branch addresses and hours
- Change colors (CSS variables in each HTML file)

**Add More Services:**
- Add rows to price tables in `prices.html`
- Add service cards in `index.html`

**Modify Commission Rates:**
- Edit commission percentages and amounts in `referral.html`
- Add or remove business types

**Change Theme Colors:**
All files use CSS variables - edit these to match your brand:
```css
--primary: #0b1e36;       /* Navy blue */
--accent: #0ea5e9;        /* Sky blue */
--teal-soft: #06b6d4;     /* Teal */
--success-green: #22c55e; /* Green */
```

---

**Questions?** Check README.md for full documentation or contact your developer.

**Good luck with your dental clinic website! 🏥✨**
