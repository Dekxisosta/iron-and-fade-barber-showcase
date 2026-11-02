<div align="center">
  <img src="./assets/images/favicon.svg" alt="Iron & Fade Logo" width="120" height="120">
  
  # Iron & Fade
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![License](https://img.shields.io/badge/License-MIT-d4af37?style=for-the-badge)](LICENSE)
  
  ### Modern Barber Shop Showcase
  *Built with Next.js & Framer Motion*
  
  [Demo](https://iron-and-fade-barber-showcase.vercel.app) • [Features](#features) • [Quick Start](#quick-start)
</div>

---

## Quick Start

```bash
npm install && npm run dev
```

Visit → http://localhost:3000
## Features

![Landing Preview](./docs/_landing.png)
*Modern, animated landing page with smooth transitions*

- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- 📅 **Smart Booking System** - Group scheduling with automatic discount rules
- 💈 **Service Showcase** - Dynamic service cards with pricing
- ⭐ **Reviews & Testimonials** - Customer feedback display
- 📱 **Responsive** - Mobile-first design approach
- ⚡ **Fast Performance** - Optimized with Next.js 15

![Contact Form](./docs/contact-form.png)
*Interactive booking dialog with form validation*

## Project Structure

```
├── app/
│   ├── globals.css          # All styles and palette (--c, --c2, --b, --a, --a2)
│   ├── layout.jsx           # Root layout with metadata
│   └── page.jsx             # Main page component
├── components/
│   ├── Booking.jsx          # Booking dialog component
│   ├── Landing.jsx          # Landing page sections
│   ├── Providers.jsx        # Context providers
│   └── Sprite.jsx           # SVG sprite component
├── lib/
│   ├── data.js              # Services, branches, barbers, awards, reviews
│   └── booking.js           # Availability, scheduling, discount rules
└── public/
    ├── hero.jpg             # Hero section background
    ├── contact.jpg          # Contact section background
    └── favicon.svg          # Site favicon
```

## Customization

### Images
Replace the following with your own photos (keep the same names):
- `public/hero.jpg` - Hero section background
- `public/contact.jpg` - Contact section background

### Data
Update placeholder data in `lib/data.js`:
- Services and pricing
- Branch locations
- Barber profiles
- Awards and reviews

**Note:** Remote barber/branch/review photos are hot-linked placeholders; replace with licensed images.

### Colors
Modify the CSS custom properties in `app/globals.css`:
```css
--c: #1a1a1a;    /* Primary dark */
--c2: #2c2c2c;   /* Secondary dark */
--b: #f5f5f5;    /* Light background */
--a: #d4af37;    /* Gold accent */
--a2: #b8941f;   /* Dark gold */
```

## License

MIT
