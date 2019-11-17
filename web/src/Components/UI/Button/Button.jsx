import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = (props) => {
    const {
        onClick, disabled, children, style, typeBtn, linkTo,
    } = props;
    return (
        <>
            {typeBtn === 'link' ? (
                <Link
                    to={linkTo}
            		onClick={onClick}
            		className="btn"
            		style={style}
            	>
            		{children}
            	</Link>
            ) : (
                <button
            		onClick={onClick}
            		className="btn"
            		disabled={disabled}
            		style={style}
            		type="submit"
            	>
            		{children}
            	</button>
            )}
        </>
    );
};

export default Button;
