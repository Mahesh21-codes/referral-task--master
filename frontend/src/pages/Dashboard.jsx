import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import ReferralTree from '../components/ReferralTree';
import Header from '../components/Header';
import apiClient from '../api/apiClient';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewUid, setViewUid] = useState(null);

    const fetchData = useCallback(async (uid) => {
        try {
            const targetUid = uid || user?.uid;
            const treeRes = await apiClient.get(`/tree/subtree/${targetUid}`);
            setTreeData(treeRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data', err);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchData(viewUid);
        }
    }, [user, fetchData, viewUid]);

    const handleNavigateToSelf = () => {
        setViewUid(user.uid);
    };

    const handleNavigateToUser = (uid) => {
        setViewUid(uid);
    };

    if (loading) return (
        <div className="loading-screen">
            <div className="loader"></div>
        </div>
    );

    return (
        <div className="dashboard-layout">
            <Header
                user={user}
                logout={logout}
                onNavigateToSelf={handleNavigateToSelf}
            />

            <main className="dashboard-content">
                <header className="content-overview">
                    <h2 className="content-title">Welcome, {user?.username}</h2>
                    <p className="auth-subtitle">Your referral network overview</p>
                </header>

                <section className="content-card">
                    {treeData && (
                        <ReferralTree
                            data={treeData}
                            onNodeClick={handleNavigateToUser}
                            isViewingSelf={viewUid === user?.uid || !viewUid}
                            onReset={handleNavigateToSelf}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
