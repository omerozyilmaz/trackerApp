# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Job Board Application

A modern job application tracking system built with React, Redux, and Tailwind CSS. Streamline your job search process with an intuitive Kanban-style board.

## 🚀 Features

- **Kanban Board Layout**: Organize jobs by application status (Wishlist, Applied, Interview)
- **Drag and Drop**: Easily move jobs between different stages of your application process
- **Dark/Light Mode**: Comfortable viewing in any environment with theme persistence
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **API Integration**: Full backend integration with JWT authentication
- **Modern UI**: Clean and professional interface with smooth animations

## 🛠️ Technologies

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **API Communication**: Axios
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Authentication**: JWT
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/job-board.git
   ```

2. Install dependencies:

   ```bash
   cd job-board
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   VITE_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔌 API Integration

The application integrates with a RESTful API with the following endpoints:

### Authentication

- **Register**: `POST /register`
- **Login**: `POST /login`

### Job Management

- **Get Jobs**: `GET /jobs`
- **Create Job**: `POST /jobs`
- **Update Job**: `PUT /jobs/:id`
- **Delete Job**: `DELETE /jobs/:id`
- **Move Job**: `PATCH /jobs/:id/move`

## 🎯 Usage

1. **Register/Login**:

   - Create an account or log in to access your job board

2. **Adding Jobs**:

   - Click the '+' button in any column
   - Fill in the job details
   - Submit the form

3. **Managing Applications**:

   - Drag and drop cards between columns
   - Click 'Show More' to view full job details
   - Delete jobs with the 'x' button that appears on hover

4. **Theme Switching**:
   - Click the theme toggle in the header
   - Theme preference is saved automatically

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
