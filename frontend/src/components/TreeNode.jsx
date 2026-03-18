import React, { useState } from 'react';

const TreeNode = ({ user, position, isRoot = false, onNodeClick, onReset, depth = 0, branch = null }) => {
    const [expanded, setExpanded] = useState(depth < 1); // Root + first level (A,B,C) always visible
    const currentBranch = depth === 0 ? null : (depth === 1 ? position : branch);
    const hasChildren = depth < 2;

    // Empty placeholder for unfilled positions
    if (!user) {
        return (
            <td className={`node-td ${branch ? `branch-${branch.toLowerCase()}` : ''}`}>
                <div className="node-cell">
                    <div className="node-circle-placeholder">
                        <span className="plus-icon">+</span>
                    </div>
                </div>
            </td>
        );
    }

    const childPositions = ['A', 'B', 'C'];

    const handleClick = () => {
        if (isRoot && onReset) {
            onReset();
            return;
        }
        // Depth 1 (A, B, C): navigate into this node's subtree
        if (depth === 1 && onNodeClick) {
            onNodeClick(user.uid);
            return;
        }
        // Deeper nodes: toggle expand/collapse
        if (hasChildren) {
            setExpanded(!expanded);
        }
    };

    return (
        <table className="tree-table">
            <tbody>
                {/* Row 1: The node itself */}
                <tr>
                    <td colSpan={hasChildren && expanded ? childPositions.length * 2 : 1} className="node-td">
                        <div className="node-cell">
                            <div
                                className={`node-circle ${isRoot ? 'root-circle' : ''} ${currentBranch ? `branch-${currentBranch.toLowerCase()}-bg` : ''} ${hasChildren ? 'expandable' : ''}`}
                                onClick={handleClick}
                                title={hasChildren ? (expanded ? 'Click to collapse' : 'Click to expand') : ''}
                            >
                                <span className="node-username">{user.username}</span>
                            </div>
                            <div className="node-uid">{user.uid}</div>
                        </div>
                    </td>
                </tr>

                {hasChildren && expanded && (
                    <>
                        {/* Row 2: Vertical line going DOWN from parent */}
                        <tr>
                            <td colSpan={childPositions.length * 2} className="line-td">
                                <div className="line-down"></div>
                            </td>
                        </tr>

                        {/* Row 3: Horizontal line spanning across children */}
                        <tr>
                            {childPositions.map((label, idx) => (
                                <React.Fragment key={label}>
                                    <td className={`line-td ${idx === 0 ? 'line-left-empty' : 'line-left-full'}`}>
                                        <div className={`line-h ${idx === 0 ? 'line-h-empty' : 'line-h-full'}`}></div>
                                    </td>
                                    <td className={`line-td ${idx === childPositions.length - 1 ? 'line-right-empty' : 'line-right-full'}`}>
                                        <div className={`line-h ${idx === childPositions.length - 1 ? 'line-h-empty' : 'line-h-full'}`}></div>
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>

                        {/* Row 4: Vertical lines going DOWN into each child */}
                        <tr>
                            {childPositions.map((label) => (
                                <td key={label} colSpan={2} className="line-td">
                                    <div className={`branch-label pos-${label.toLowerCase()}`}>{label}</div>
                                    <div className="line-down"></div>
                                </td>
                            ))}
                        </tr>

                        {/* Row 5: The child nodes themselves */}
                        <tr>
                            {childPositions.map((label) => {
                                const child = user.children
                                    ? user.children.find(c => c.position === label)
                                    : null;
                                return (
                                    <td key={label} colSpan={2} className="child-td">
                                        <TreeNode
                                            user={child}
                                            position={label}
                                            onNodeClick={onNodeClick}
                                            onReset={onReset}
                                            depth={depth + 1}
                                            branch={currentBranch || label}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    );
};

export default TreeNode;
