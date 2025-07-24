import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

const AppContent: React.FC = () => {
  // Para pruebas, forzamos token=true. En producción usa localStorage
  const token = true;
  const location = useLocation();
  
  // No mostrar en rutas de home y login
  const noMostrarNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {token && !noMostrarNavbar && <Navbar />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit" component={EditProfile} />
        <Redirect from="/" to={token ? "/profile" : "/login"} />
      </Switch>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;