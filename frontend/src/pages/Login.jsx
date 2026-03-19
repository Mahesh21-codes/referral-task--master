import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await apiClient.post('/auth/login', { username, password });
            login({ username: response.data.username, uid: response.data.uid }, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'Access Denied: Invalid Workspace Credentials');
        }
    };

    return (
        <AuthLayout
            title="Login"
            subtitle="Please enter your details to sign in"
            footer={<span>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></span>}
        >
            {error && <div className="error-banner">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="input-field"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <div className="label-row">
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>
                    <div className="password-input-wrapper">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="input-field"
                            placeholder="Enter the password"
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
                
                <button type="submit" className="btn-primary">
                    Sign In
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
