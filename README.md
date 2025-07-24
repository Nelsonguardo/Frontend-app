#Frontend App

This project is a modern frontend application built with React that allows users to authenticate, view, edit their profile, and upload a profile picture. It consumes a REST API that uses JWT for authentication.

## Features

- User authentication with JWT
- View user profile information
- Edit user profile details
- Upload a profile picture

## Technologies Used

- React
- TypeScript
- Axios (for API calls)
- React Router (for routing)
- Bootstrap/Tailwind/Material UI (for styling)

## Project Structure

```
my-frontend-app
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components
│   │   └── Navbar.tsx      # Navigation bar component
│   ├── pages
│   │   ├── Login.tsx       # Login page component
│   │   ├── Profile.tsx     # Profile page component
│   │   └── EditProfile.tsx  # Edit profile page component
│   ├── services
│   │   └── api.ts          # API service for making requests
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point for the React application
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Nelsonguardo/my-frontend-app.git
   ```

2. Navigate to the project directory:

   ```
   cd my-frontend-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

### API Endpoints

The application interacts with the following API endpoints:

- **Login**: `POST http://46.202.88.87:8010/usuarios/api/login/`
- **Get Profile**: `GET http://46.202.88.87:8010/usuarios/api/perfil/`
- **Edit Profile**: `PUT http://46.202.88.87:8010/usuarios/api/usuario/perfil/`

### License

This project is licensed under the MIT License.
