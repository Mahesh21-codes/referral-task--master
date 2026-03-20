import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [referralUid, setReferralUid] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await apiClient.post('/auth/register', {
                username,
                password,
                referralUid
            });
            login({ username: response.data.username, uid: response.data.uid }, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <AuthLayout
            title="Register"
            subtitle="Join our community and start earning"
            footer={<span>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></span>}
        >
            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="reg-username">Username</label>
                    <div className="input-group-wrapper">
                        <User className="input-icon" size={18} />
                        <input
                            id="reg-username"
                            type="text"
                            className="input-field"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <div className="form-group">
                    <label className="form-label" htmlFor="reg-password">Password</label>
                    <div className="input-group-wrapper">
                        <Lock className="input-icon" size={18} />
                        <div className="password-input-wrapper">
                            <input
                                id="reg-password"
                                type={showPassword ? "text" : "password"}
                                className="input-field"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="referral-uid">Referral Code (Optional)</label>
                    <div className="input-group-wrapper">
                        <LinkIcon className="input-icon" size={18} />
                        <input
                            id="referral-uid"
                            type="text"
                            className="input-field"
                            placeholder="Enter referral code"
                            value={referralUid}
                            onChange={(e) => setReferralUid(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary">
                    Create Account
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
