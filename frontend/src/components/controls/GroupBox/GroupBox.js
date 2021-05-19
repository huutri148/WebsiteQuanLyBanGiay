import { ErrorOutline } from "@material-ui/icons";
import React from "react";
import ValidationTip from "../ValidationTip";
import './GroupBox.css';
export default function GroupBox (props) {
    return(
        <div>
            <span style={{
                    fontSize: 16,
                    fontWeight: 600,}}>
                <label>{props.title}</label>
                <label style={{
                    marginLeft: 5,
                    color: 'Red'}}>{props.required ? '*' : ''}
                </label>
                <ValidationTip placement="top" title={props.validationTip}>
                        <ErrorOutline style={{float: "right", margin: "5", width:"15", height:"15", display: props.error === true ? "block" : "none"}} color = "secondary"/>
                </ValidationTip>
            </span>
            {props.type === 'Picker' && 
            <input 
                className={props.error === true ? "error" : ""}
                required = {props.required}
                disabled = {props.disabled}   
                type="date"
                readOnly={props.readOnly}
                value = {props.value}
                defaultValue={(new Date().getMonth()+1 > 9) ? (new Date().getFullYear()+"-" +(new Date().getMonth()+1)+"-"+new Date().getDate()):
                                                            (new Date().getFullYear()+"-0" +(new Date().getMonth()+1)+"-"+new Date().getDate())}/>
            }
            {props.type === 'TextBox' && 
            <input   
                className={props.error === true ? "error" : ""}
                value = {props.value}
                disabled = {props.disabled}  
                readOnly={props.readOnly}    
                required = {props.required}/>
            } 
            {props.type === 'Number' && 
            <input   
                onInput = {e => props.onInput(e)}
                className={props.error === true ? "error" : ""}
                value = {props.value}
                disabled = {props.disabled}  
                readOnly={props.readOnly}    
                required = {props.required}/>
            } 
        </div>
    );
}