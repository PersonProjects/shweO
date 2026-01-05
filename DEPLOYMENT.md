# 🚀 Quick Deployment Guide

## Deploy to Vercel (Recommended - 5 minutes)

### Option 1: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to project directory
cd shweo-commerce

# 3. Install dependencies
npm install

# 4. Deploy!
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? shweo-commerce (or your choice)
# - Directory? ./
# - Override settings? N

# Your app will be live in seconds!
```

### Option 2: GitHub + Vercel (Best for ongoing development)

```bash
# 1. Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: ShweO Commerce Prototype"

# 2. Create a new repository on GitHub

# 3. Push your code
git remote add origin https://github.com/YOUR_USERNAME/shweo-commerce.git
git branch -M main
git push -u origin main

# 4. Go to vercel.com
# - Sign in with GitHub
# - Click "New Project"
# - Import your repository
# - Vercel will auto-detect Vite
# - Click "Deploy"

# Done! Your app is live with automatic deployments on every push
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# App runs on http://localhost:5173
```

## Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Project Features Ready to Demo

✅ **Dashboard** - Business overview at a glance
✅ **Orders** - 50 sample orders with filters and search
✅ **Products** - 20 products with stock management
✅ **Channels** - Telegram, Messenger, Viber management
✅ **Dark/Light Mode** - Full theme support
✅ **Burmese/English** - Complete translations
✅ **Mobile Responsive** - Works on all devices

## Demo Credentials

- **Shop**: Ma Thandar Shop
- **Orders**: 50 pre-loaded with Myanmar data
- **Products**: 20 items with Burmese names
- **Channels**: Telegram & Messenger connected

## Customization

### Change Brand Colors

Edit `src/config/colors.ts`:
```typescript
export const BRAND_COLORS = {
  primary: '#111827',   // Your primary color
  success: '#10B981',   // Your accent color
  // ...
}
```

### Change Shop Name

Edit `src/layouts/CommerceLayout.vue` and `src/views/Settings.vue`:
```typescript
const shopName = 'Your Shop Name'
```

### Add More Mock Data

- Orders: `src/mocks/orders.ts`
- Products: `src/mocks/products.ts`
- Channels: `src/mocks/channels.ts`

## Troubleshooting

### Port already in use?
```bash
npm run dev -- --port 3000
```

### Build errors?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Deployment issues?
- Ensure `package.json` has correct build command
- Vercel build settings:
  - Build Command: `npm run build`
  - Output Directory: `dist`

## Next Steps

1. **Test the prototype** with your team
2. **Gather feedback** from potential users
3. **Iterate** on the design
4. **Plan backend integration** when ready

## Support

- Check the main `README.md` for detailed documentation
- Review code comments for implementation details
- All components are well-structured for easy modification

---

**Your prototype is ready! 🎉**

Test it, demo it, and gather feedback for the next iteration!
