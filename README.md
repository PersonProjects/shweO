# ShweO - Social Commerce Order Hub

A Vue 3 prototype for managing social commerce orders from Telegram, Messenger, and Viber channels.

## Brand

- **Name**: ShweO
- **Primary Color**: #111827 (Charcoal)
- **Accent Color**: #10B981 (Emerald Green)
- **Shop**: Ma Thandar Shop

## Features

### ✅ Implemented

- **Dashboard**: Overview with today's orders, pending, completed, and revenue stats
- **Orders Management**: 
  - View all orders with filters (status, channel, search)
  - Order detail view with full information
  - Status updates (Unseen → Confirmed → Shipped → Delivered)
  - Direct links to original chat conversations
  - Order cards with channel badges
- **Products Management**:
  - Product list with search
  - Add/Edit products
  - Stock tracking (optional)
  - Active/Inactive toggle
  - Low stock alerts
- **Channels Management**:
  - Connect/Disconnect channels (Telegram, Messenger, Viber)
  - Enable/Disable channels
  - View orders by channel statistics
- **Settings**:
  - Language switcher (English/Burmese)
  - Theme toggle (Light/Dark mode)
  - Shop information

### 🌐 Internationalization

- **English** (en)
- **Burmese** (mm) - Full translation included

### 🎨 Design

- Material Design 3 (Vuetify 3)
- Tailwind CSS for utilities
- Fully responsive (mobile-first)
- Dark mode support
- Material Design Icons

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **TypeScript**: Full type safety
- **UI Library**: Vuetify 3
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **i18n**: Vue I18n
- **Notifications**: Vue Toast Notification
- **Icons**: Material Design Icons (MDI)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The app will run on `http://localhost:5173`

## Project Structure

```
shweo-commerce/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable Vue components
│   ├── config/           # Configuration files
│   │   └── colors.ts     # Brand colors
│   ├── i18n/             # Internationalization
│   │   └── locales/      # Translation files (en, mm)
│   ├── layouts/          # Layout components
│   │   └── CommerceLayout.vue
│   ├── mocks/            # Mock data
│   │   ├── orders.ts     # 50 sample orders
│   │   ├── products.ts   # 20 sample products
│   │   └── channels.ts   # Channel configurations
│   ├── plugins/          # Vue plugins
│   │   └── vuetify.ts    # Vuetify configuration
│   ├── router/           # Vue Router
│   ├── stores/           # Pinia stores
│   │   ├── orders.store.ts
│   │   ├── products.store.ts
│   │   ├── channels.store.ts
│   │   └── ui.store.ts
│   ├── types/            # TypeScript types
│   │   └── commerce.ts   # Order, Product, Channel types
│   ├── views/            # Page components
│   │   ├── Dashboard.vue
│   │   ├── Orders.vue
│   │   ├── Products.vue
│   │   ├── Channels.vue
│   │   └── Settings.vue
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## Mock Data

The prototype includes realistic Myanmar mock data:

- **50 Orders** with:
  - Burmese customer names and addresses
  - Various statuses (unseen, confirmed, shipped, delivered, cancelled)
  - Multiple channels (Telegram, Messenger, Viber)
  - Realistic products and prices
  - Myanmar phone numbers
  - Chat deep links

- **20 Products** with:
  - Burmese product names
  - Product codes
  - Prices in MMK
  - Stock quantities
  - Active/inactive status

- **3 Channels**:
  - Telegram (Connected)
  - Messenger (Connected)  
  - Viber (Not connected)

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub + Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy

### Build Settings (if needed)

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Key Features for Demo

### 1. Dashboard
- Real-time statistics
- Channel breakdown
- Recent orders list

### 2. Orders Management
- **Unseen orders** highlighted with green border
- Filter by status and channel
- Search by order number, name, or phone
- Click any order to see full details
- "Open in [Channel]" button shows deep-link concept
- Update order status with dropdown

### 3. Products Management
- Data table with search
- Add/Edit products with modal form
- Toggle active/inactive status
- Low stock warnings (< 10 items)
- Optional stock tracking

### 4. Channels Management
- Visual connection status
- Connect/Disconnect functionality
- Enable/Disable toggle
- Orders by channel statistics

### 5. Multi-language & Theme
- Language switcher in top bar
- Dark/Light mode toggle
- Persistent preferences

## Core Concepts Demonstrated

1. **Social Commerce Integration**: Orders come from chat apps, not a marketplace
2. **Unified Dashboard**: Single view for all channels
3. **Deep Links**: Direct access to original conversations
4. **Myanmar Market**: Burmese language, local names, COD payment
5. **Mobile-First**: Responsive design for mobile sellers
6. **Status Workflow**: Clear order lifecycle management

## Next Steps (Post-Prototype)

- Real API integration
- Authentication system
- Real-time notifications
- Order analytics & reports
- Multi-staff roles
- Courier integrations
- Payment reconciliation
- AI-assisted order parsing

## Notes

- This is a **prototype** with mock data
- No backend required - runs entirely in the browser
- Data resets on page refresh
- Perfect for demonstration and user testing

## Support

For questions or issues, please refer to the project documentation.

---

**Built with ❤️ for Myanmar sellers**
