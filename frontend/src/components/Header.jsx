import React, { useState } from 'react';
import { LogOut, LayoutGrid, Users, Menu, X } from 'lucide-react';

const Header = ({ user, logout, onNavigateToSelf }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="dashboard-header">
            <div className="header-container">
                <div className="header-left">
                    <div className="header-brand">
                        <div className="brand-logo">R</div>
                        <span className="brand-name">Referral</span>
                    </div>
                </div>

                <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <button className="nav-item active" onClick={() => setIsMenuOpen(false)}>
                        <LayoutGrid size={18} />
                        <span>Network Tree</span>
                    </button>
                    <button className="nav-item" onClick={() => { onNavigateToSelf(); setIsMenuOpen(false); }}>
                        <Users size={18} />
                        <span>My Position</span>
                    </button>
                    
                    {/* Mobile Only Logout */}
                    <button className="nav-item mobile-logout" onClick={logout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </nav>

                <div className="header-right">
                    <div className="user-profile">
                        <div className="user-avatar">
                            {user?.username?.[0].toUpperCase()}
                        </div>
                        <div className="user-meta">
                            <span className="user-display-name">{user?.username}</span>
                            <span className="user-plan">Free Plan</span>
                        </div>
                    </div>
                    <button className="header-logout-btn" onClick={logout} title="Logout">
                        <LogOut size={20} />
                    </button>
                    <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && <div className="header-overlay" onClick={() => setIsMenuOpen(false)} />}
        </header>
    );
};

export default Header;
