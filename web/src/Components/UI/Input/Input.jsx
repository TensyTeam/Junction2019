import React from 'react';
import './Input.css';

const Input = (props) => {
    const {
        onClick, name, id, type, onChange, disabled, className, required, value, style, placeholder,
        refprop,
    } = props;
    return (
	<input
		id={id}
		name={name}
		type={type}
		onClick={onClick}
		onChange={onChange}
		className={className}
		disabled={disabled}
		required={required}
		value={value}
		style={style}
		placeholder={placeholder}
        ref={refprop}
	/>
    );
};

export default Input;
