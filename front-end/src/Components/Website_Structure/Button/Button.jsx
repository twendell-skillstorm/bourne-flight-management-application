import {useState} from "react";
import './Button.css';

export const Button = (props) => {
    return (
        <button className={props.class+" btn btn-primary button"} onClick={props.onClick}>{props.buttonName}</button>
    );
}

export default Button;