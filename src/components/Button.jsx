import React from 'react';

const Button = ({
    label,
    icon: Icon,
    onClick,
    isLoading,
    disabled = false,
    styles
}) => {
    return (
        <button
            disabled={disabled}
            className={`
                button 
                ${isLoading ? 'is-loading' : ''}
                ${styles ? styles : ''}
            `}
            onClick={onClick}
        >
            {Icon && (
                <span className='icon'>
                    <Icon />
                </span>
            )}
            <span>{label}</span>
        </button>
    );
};

export default Button;