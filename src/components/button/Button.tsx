import React from 'react';

interface ButtonProps {
    text: string; // Add a prop for dynamic button text
}

function Button({ text }: ButtonProps) {
    return (
        <input
            className="bg-blue-400 text-blue-950 transition-all ease-in-out hover:bg-blue-600 hover:text-white px-4 py-4 rounded-lg font-poppins"
            type="submit"
            value={text} // Set dynamic text here
        />
    );
}

export default Button;
