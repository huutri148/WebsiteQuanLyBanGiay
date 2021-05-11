import React from "react";
import './GroupBox.css';
export default function GroupBox (props) {
    return(
        <>
        <span style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 5
        }}>
            <label>{props.title}</label>
            <label style={{
                marginLeft: 5,
                color: 'Red'}}>{props.required ? '*' : ''}
            </label>
        </span>
        {props.type === 'Picker' && 
            <input required = {props.required}
                disabled = {props.disabled}   
                type="date"
                defaultValue={(new Date().getMonth()+1 > 9) ? (new Date().getFullYear()+"-" +(new Date().getMonth()+1)+"-"+new Date().getDate()):
                                                              (new Date().getFullYear()+"-0" +(new Date().getMonth()+1)+"-"+new Date().getDate())}>
            </input>
        }
        {props.type === 'TextBox' && 
            <input   
                disabled = {props.disabled}        
                required = {props.required}>
            </input>
        }        
        </>
    );
}