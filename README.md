# RightsGuardian 🛡️

Your pocket guide to instant legal clarity and emergency action.

## Overview

RightsGuardian is a Base MiniApp designed to provide instant, accessible "Know Your Rights" information and emergency contact directories for individuals facing specific rights-related situations. Built for the Base ecosystem and optimized for Farcaster integration.

## Features

### Core Features ✨

- **Emergency Contact Directory**: Curated list of essential contacts (legal aid, authorities, advocacy groups) categorized by situation
- **Interactive Checklists**: Step-by-step, actionable checklists for common legal emergencies with progress tracking
- **Rights Knowledge Base**: Summaries of rights and legal issues tailored to specific demographics and situations
- **Education Snippets**: Short, shareable content explaining rights and legal concepts in simple terms

### Technical Features 🔧

- **Base MiniApp Integration**: Native integration with Base Wallet and MiniKit
- **Micro-transactions**: Premium content unlocked via Base network payments
- **Social Sharing**: Share education snippets on Farcaster and other platforms
- **Progress Tracking**: Persistent checklist progress across sessions
- **Responsive Design**: Optimized for mobile and desktop experiences

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network integration via OnchainKit
- **State Management**: React hooks with custom API layer
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Base wallet (for testing payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vistara-apps/d1a9e08e-235e-4373-8668-76e2976d753c.git
cd d1a9e08e-235e-4373-8668-76e2976d753c
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your configuration.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── guides/        # Emergency guides API
│   │   ├── contacts/      # Emergency contacts API
│   │   ├── education/     # Education snippets API
│   │   ├── user/          # User management API
│   │   └── checklist/     # Checklist progress API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main app page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── AppShell.tsx      # Main app shell
│   ├── Dashboard.tsx     # Dashboard component
│   ├── EmergencyGuides.tsx
│   ├── EmergencyContacts.tsx
│   ├── RightsEducation.tsx
│   ├── ChecklistComponent.tsx
│   └── PremiumGate.tsx   # Premium content gate
├── lib/                  # Utilities and data
│   ├── hooks/           # Custom React hooks
│   ├── types.ts         # TypeScript type definitions
│   ├── data.ts          # Sample data
│   ├── constants.ts     # App constants
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## API Documentation

### Guides API

- `GET /api/guides` - Get all emergency guides with filtering
- `GET /api/guides/[id]` - Get specific guide
- `POST /api/guides` - Create new guide (admin)
- `PUT /api/guides/[id]` - Update guide (admin)

### Contacts API

- `GET /api/contacts` - Get all emergency contacts with filtering
- `POST /api/contacts` - Create new contact (admin)

### Education API

- `GET /api/education` - Get education snippets with filtering
- `POST /api/education` - Create new snippet (admin)
- `POST /api/education/[id]/share` - Share snippet

### User API

- `GET /api/user` - Get user profile and preferences
- `PUT /api/user` - Update user preferences
- `POST /api/user` - Handle premium pack purchase

### Checklist API

- `GET /api/checklist` - Get checklist progress
- `POST /api/checklist` - Create/update checklist
- `PUT /api/checklist` - Update specific checklist item

## Business Model

### Pricing Structure

- **Free Tier**: Basic guides and limited emergency contacts
- **Premium Packs**: $0.50-$1.00 per emergency pack
- **Premium Subscription**: $5/month for unlimited access

### Premium Features

- Advanced checklists with progress tracking
- Personalized emergency contacts
- Detailed scenario breakdowns
- Priority support contacts

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@rightsguardian.app or join our community on Farcaster.

## Roadmap

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Real Base network payment integration
- [ ] Advanced analytics and user insights
- [ ] Multi-language support
- [ ] Voice-guided emergency assistance
- [ ] Integration with legal service providers
- [ ] Community-contributed content
- [ ] Mobile app (React Native)

---

Built with ❤️ for the Base ecosystem and the rights of all individuals.
