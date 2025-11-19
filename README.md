# LeadBlocks Mini Dashboard

A mini dashboard application that fetches, displays, and allows filtering of lead data. Built with Next.js, TypeScript, and Tailwind CSS, styled with LeadBlocks branding.

## Features

- ✅ **Authentication**: Login system with hardcoded user credentials
- ✅ **Dashboard**: Overview page with a table displaying leads (Name, Company, Email, Status)
- ✅ **Filtering**: Filter leads by status (Active/Inactive/All)
- ✅ **Add Leads**: Modal interface to add new leads
- ✅ **REST API**: Backend API with GET, POST, and PUT endpoints
- ✅ **Data Storage**: JSON file-based storage for leads data
- ✅ **Responsive Design**: Mobile-friendly interface with modern UI

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Data Storage**: JSON file (`data/leads.json`)
- **Authentication**: LocalStorage-based token system

## Project Structure

```
demo-project/
├── data/
│   └── leads.json              # Mock data storage
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login.ts    # POST /api/auth/login
│   │   │   │   └── me.ts       # GET /api/auth/me
│   │   │   └── leads/
│   │   │       ├── index.ts    # GET, POST /api/leads
│   │   │       └── [id].ts     # PUT /api/leads/:id
│   │   ├── dashboard.tsx       # Main dashboard page
│   │   ├── login.tsx           # Login page
│   │   └── index.tsx            # Home/redirect page
│   ├── utils/
│   │   ├── api.ts              # API client functions
│   │   └── auth.ts             # Authentication utilities
│   └── styles/
│       └── globals.css         # Global styles
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. You'll be redirected to the login page. Use these credentials:
   - **Email**: `admin@leadblocks.nl`
   - **Password**: `admin123`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Check authentication status

### Leads

- `GET /api/leads?status=Active` - Get all leads (optional status filter)
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update an existing lead

## Technical Decisions

### Why Next.js API Routes instead of Strapi?

I chose Next.js API Routes over Strapi for several reasons:
1. **Simplicity**: For a mini dashboard, a full CMS like Strapi adds unnecessary complexity
2. **No External Dependencies**: Everything runs in one application, easier to deploy and maintain
3. **Type Safety**: Shared TypeScript types between frontend and backend
4. **Performance**: No additional server or database setup required
5. **Learning Curve**: Faster to implement and easier for others to understand

### Why JSON File Storage?

- **Simplicity**: No database setup required, perfect for a demo/mini project
- **Portability**: Easy to backup, version control, and share
- **Development Speed**: Quick to implement and iterate
- **Suitable for Demo**: Meets the requirement of "mock data is fine"

### Authentication Approach

- **LocalStorage-based tokens**: Simple and sufficient for a demo application
- **Hardcoded credentials**: As specified in requirements, easy to test
- **Token-based**: Mimics real-world authentication patterns

### UI/UX Decisions

- **Modal for Add Lead**: Keeps users in context, no page navigation needed
- **Status Filter**: Dropdown for quick filtering without losing other data
- **Responsive Design**: Works on mobile and desktop
- **LeadBlocks Branding**: Blue color scheme (#2563eb) with clean, professional design

## What I Would Do Differently with More Time

### Backend Improvements

1. **Database Integration**: Replace JSON file with PostgreSQL or MongoDB for production use
2. **Proper Authentication**: Implement JWT tokens with refresh tokens, password hashing (bcrypt)
3. **Input Validation**: Add comprehensive validation using libraries like Zod or Yup
4. **Error Handling**: More detailed error messages and proper error logging
5. **API Rate Limiting**: Prevent abuse and ensure fair usage
6. **Data Pagination**: For large datasets, implement pagination instead of loading all leads

### Frontend Enhancements

1. **Edit/Delete Functionality**: Add ability to edit and delete existing leads
2. **Search Functionality**: Search leads by name, company, or email
3. **Sorting**: Sort table columns (name, company, email, status)
4. **Loading States**: Better loading indicators and skeleton screens

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This is a demo project created for assignment purposes.
