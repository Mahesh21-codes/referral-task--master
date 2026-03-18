import React from 'react';
import TreeNode from './TreeNode';
import './ReferralTree.css';

const ReferralTree = ({ data, onNodeClick, isViewingSelf, onReset }) => {
    if (!data) return <div className="no-data">No tree data available.</div>;

    return (
        <div className="referral-tree-wrapper">
            <div className="tree-header">
                <div className="header-left">
                    <h2>Network Tree</h2>
                    <p className="viewing-label">
                        Viewing: <strong>{data.username}</strong>
                        {!isViewingSelf && (
                            <button className="reset-btn" onClick={onReset}>
                                ← Back to my tree
                            </button>
                        )}
                    </p>
                </div>
            </div>
            <div className="tree-viewport">
                <div className="tree-container">
                    <TreeNode user={data} isRoot={true} onNodeClick={onNodeClick} onReset={onReset} />
                </div>
            </div>
        </div>
    );
};

export default ReferralTree;
