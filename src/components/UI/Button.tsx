import React from 'react';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button = ({ onClick, children, className = '' }: ButtonProps) => {
    return (
        <button
            type='button'
            className={`bg-primary hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer text-white font-semibold py-2 px-4 rounded-md ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;