import React from 'react';

const AuthLayout = ({ title, subtitle, children, footer }) => {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
                    <div className="auth-title" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>{title}</div>
                </div>
                
                <div className="auth-header">
                    {subtitle && <p className="auth-subtitle">{subtitle}</p>}
                </div>

                <div className="auth-content">
                    {children}
                </div>

                {footer && (
                    <div className="auth-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
