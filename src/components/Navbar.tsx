import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import { FaUser, FaEdit, FaSignOutAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    history.push('/login');
  };
  return (
    <nav className="navbar-pro">
      <div className="navbar-pro-container">
        <NavLinkPro to="/profile" icon={<FaUser size={22} />} label="Perfil" />
        <NavLinkPro to="/edit" icon={<FaEdit size={22} />} label="Editar" />
        <button className="navbar-pro-link" onClick={handleLogout} title="Salir" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <FaSignOutAlt size={22} />
          <span className="navbar-pro-label">Salir</span>
        </button>
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