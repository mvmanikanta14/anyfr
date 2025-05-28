import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb1 = () => {
    const location = useLocation();

    // Split the current path into an array of parts based on slashes
    const pathParts = location.pathname.split('/').filter(part => part);

    // Map each part to its breadcrumb
    const breadcrumbs = pathParts.map((part, index) => {
        const breadcrumbPath = `/${pathParts.slice(0, index + 1).join('/')}`;
        
        // Dynamically convert route names to readable format (you can customize this further)
        const displayName = part.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

        return (
            <span key={index}>
                <Link to={breadcrumbPath}>{displayName}</Link>
                {index < pathParts.length - 1 && ' > '}
            </span>
        );
    });

    return (
        <div className="breadcrumbs">
            {breadcrumbs.length > 0 ? (
                <>
                    <Link to="/">Home</Link> {breadcrumbs}
                </>
            ) : (
                <Link to="/">Home</Link>
            )}
        </div>
    );
};

export default Breadcrumb1;
