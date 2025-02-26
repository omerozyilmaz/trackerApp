# Job Search Tracker

A comprehensive job search management application built with React, Redux, and Tailwind CSS. Track your job applications, organize interviews, and streamline your entire job search process with this intuitive platform.

![Job Search Tracker Demo](demo-screenshot.png)

## 🚀 Features

- **Kanban Board Layout**: Organize jobs by application status (Wishlist, Applied, Interview, Offer, Rejected)
- **Drag and Drop**: Easily move jobs between different stages of your application process
- **User Authentication**: Secure login and registration system
- **Dark/Light Mode**: Comfortable viewing in any environment with theme persistence
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Form Validation**: Comprehensive client-side validation for all forms
- **Contact Page**: Easy access to developer information and project inquiries
- **Modern UI**: Clean and professional interface with smooth animations

## 🛠️ Technologies

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Form Management**: Custom Redux implementation
- **Authentication**: JWT-based auth system
- **Validation**: Custom validation utilities
- **Storage**: Local Storage for theme preferences
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/omerozyilmaz/job-search-tracker.git
   ```

2. Install dependencies:

   ```bash
   cd job-search-tracker
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

[View Demo](https://github.com/omerozyilmaz/job-search-tracker) | [Report Bug](https://github.com/omerozyilmaz/job-search-tracker/issues) | [Request Feature](https://github.com/omerozyilmaz/job-search-tracker/issues)

## 🎯 Usage

1. **Getting Started**:

   - Register for a new account or log in
   - Navigate to the Job Board to start tracking applications

2. **Adding Jobs**:

   - Click the '+' button in any column
   - Fill in the job details
   - Submit the form

3. **Managing Applications**:

   - Drag and drop cards between columns
   - Click on a job card to view full details
   - Update job status as you progress

4. **User Profile**:
   - View and edit your profile information
   - Track application statistics

## 🔧 Project Structure

```
job-search-tracker/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── store/           # Redux store configuration
│   │   └── slices/      # Redux slices
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
└── package.json         # Project dependencies
```

## 📱 Responsive Design

The application follows a mobile-first approach with the following breakpoints:

- `sm`: 640px (Small devices)
- `md`: 768px (Medium devices)
- `lg`: 1024px (Large devices)
- `xl`: 1280px (Extra large devices)

## 🎨 Color Scheme

- **Primary**: Purple (#9333EA)
- **Background Light**: #f9f5ff
- **Background Dark**: Gray-900 (#111827)
- **Text Light**: Gray-900 (#111827)
- **Text Dark**: Gray-50 (#F9FAFB)
- **Accent**: Various purple shades

## ✨ Key Features Explained

### Authentication System

The application uses a secure authentication system with JWT tokens. User credentials are validated both on the client and server side.

### Job Board

The Kanban-style job board allows users to:

- Visualize their job application pipeline
- Move jobs between different stages
- Filter and search for specific applications
- Add detailed notes and information for each job

### Form Validation

All forms in the application use a comprehensive validation system:

- Real-time validation feedback
- Field-specific error messages
- Cross-field validation (e.g., password confirmation)
- Clean code approach with separated validation logic

### Theme System

The application supports both light and dark modes:

- Theme preference is saved in local storage
- Smooth transitions between themes
- Consistent styling across all components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👏 Acknowledgments

- React.js team for the amazing framework
- Redux team for the state management library
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project

## 📞 Contact

Ömer Özyılmaz - [LinkedIn](https://www.linkedin.com/in/omerozyilmaz/) - [GitHub](https://github.com/omerozyilmaz) - [Email](mailto:omerozylmaz2@gmail.com)

Project Link: [https://github.com/omerozyilmaz/job-search-tracker](https://github.com/omerozyilmaz/job-search-tracker)

[⬆ Back to Top](#job-search-tracker)
