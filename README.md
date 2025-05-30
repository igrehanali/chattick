# Chattick Admin Panel

Chattick Admin is a comprehensive admin dashboard for managing tutorials, FAQs, rewards, settings, and more, built with Next.js and Firebase. This project provides CRUD operations for various modules and integrates with Firebase Firestore and Storage for data management.

## Features

- **Tutorial Management:** Create, update, delete, and list tutorials with file uploads to Firebase Storage.
- **FAQ & Category Management:** Manage FAQs and their categories with full CRUD support.
- **Rewards System:** Administer rewards, toggle their status, and manage reward data.
- **Settings:** Update and retrieve system-wide settings, including withdrawal, chat, user limits, referral contests, and payment configurations.
- **Analytics & Reports:** Analyze usage, bug reports, feature suggestions, and more.
- **User & Subscription Management:** Manage users, subscriptions, contests, and support requests.

## Tech Stack

- **Next.js** (React framework)
- **Firebase** (Firestore & Storage)
- **Modern CSS** (modular and global styles)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- Firebase project (with Firestore and Storage enabled)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/igrehanali/Chattick-Admin.git
   cd Chattick-Admin
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase:
   - Copy your Firebase config to `lib/firebase.js`.
   - Ensure Firestore and Storage are enabled in your Firebase project.

### Running the App

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the admin panel.

## Project Structure

- `app/` - Main application pages and components
- `lib/services/` - Service modules for tutorials, FAQs, rewards, settings, etc.
- `public/` - Static assets
- `styles/` - CSS files

## Firebase Integration

- Firestore is used for storing tutorials, FAQs, rewards, and settings.
- Firebase Storage is used for uploading tutorial files.
- All CRUD operations are handled via service modules in `lib/services/`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
