import React from 'react';
import { LogOut, LayoutGrid, Users, X } from 'lucide-react';

const Sidebar = ({ user, logout, onNavigateToSelf, isOpen, onClose }) => {
    return (
        <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-brand">
                <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Dashboard</h1>
                <button className="sidebar-close" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <nav className="sidebar-nav">
                <button className="nav-link active">
                    <LayoutGrid size={20} />
                    <span>Network Tree</span>
                </button>
                <button className="nav-link" onClick={onNavigateToSelf}>
                    <Users size={20} />
                    <span>My Position</span>
                </button>
            </nav>

            <div className="sidebar-user">
                <div className="user-details">
                    <div className="user-img">
                        {user?.username?.[0].toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.username}</span>
                        <span className="user-role">Free Plan</span>
                    </div>
                </div>
                <button className="nav-link logout-btn" onClick={logout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
