import React from 'react';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({ onClick, children, className = '', type = 'button' }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`bg-primary hover:shadow-md hover:bg-primary/80 transition-all duration-300 ease-in-out cursor-pointer text-white font-semibold py-2 px-4 rounded-md ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;