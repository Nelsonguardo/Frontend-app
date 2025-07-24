import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUser, FaEdit, FaSignOutAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar-pro">
      <div className="navbar-pro-container">
        <NavLinkPro to="/profile" icon={<FaUser size={22} />} label="Perfil" />
        <NavLinkPro to="/edit" icon={<FaEdit size={22} />} label="Editar" />
        <NavLinkPro to="/login" icon={<FaSignOutAlt size={22} />} label="Salir" />
      </div>
    </nav>
  );
};

function NavLinkPro({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link className="navbar-pro-link" to={to} title={label}>
      {icon}
      <span className="navbar-pro-label">{label}</span>
    </Link>
  );
}

export default Navbar;