# Library Management System

## Introduction
A modern library management system built with React and Firebase offers a seamless experience for users to browse books, manage their profiles, and handle book borrowing/returns. The system features a clean UI with dark mode support and responsive design.

## Project Type
Frontend with Firebase Integration

## Deployed App
https://library-explorers.netlify.app/

## Features
- 📚 Browse extensive book collection with search and filter capabilities
- 👤 User authentication and profile management
- 📖 Book borrowing and return system
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🔍 Advanced search with title, author, and genre filters
- 📊 User dashboard with borrowed books tracking

## Design Decisions & Assumptions
- Used shadcn/ui for consistent and modern UI components
- Implemented Firebase Authentication for user management
- Responsive grid layout for book display
- Assumed books have fixed attributes (title, author, image, availability)
- Toast notifications for user feedback
- Mobile-first design approach

## Installation & Getting Started
1. Clone the repository
```bash
git clone https://github.com/imakash13/The_code_explorers.git
cd library-lingo-main
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

## Usage
1. Visit the homepage to browse available books
2. Sign in/up using the authentication system
3. View your profile to see borrowed books
4. Use the search bar to find specific books
5. Click on books to view details
6. Use the profile section to manage your borrowed books

## Credentials
Demo Account:
- Email: demo@example.com
- Password: demo123

## Technology Stack
- ⚛️ React (Frontend framework)
- 🔥 Firebase (Authentication & Database)
- 💨 Tailwind CSS (Styling)
- 🎨 shadcn/ui (UI Components)
- ⚡ Vite (Build tool)
- 📦 TypeScript (Type safety)
- 🔄 React Query (Data fetching)
- 🎯 React Router (Navigation)

## Project Structure
```
library-management/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License

