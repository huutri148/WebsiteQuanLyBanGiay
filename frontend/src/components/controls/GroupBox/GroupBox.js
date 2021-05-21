import { ErrorOutline } from "@material-ui/icons";
import {React, useState} from "react";
import ValidationTip from "../ValidationTip";
import './GroupBox.css';
export default function GroupBox (props) {
      //regex
    const phoneRegex = /^[0-9\b]+$/;
    const [numberError, setNumberError] = useState(false);   
    const onlyNumbers = (event) => {
        if(isNaN(event.key))
        {
            setNumberError(true);
        }
      };
    const onInput = (e) => {
        let tmp = e.target.value;
        if(tmp ==='' || phoneRegex.test(tmp))
            setNumberError(false);
    }
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
                        <ErrorOutline style={{float: "right", margin: "5", width:"15", height:"15", display: props.error === true && numberError === false ? "block" : "none"}} color = "secondary"/>
                </ValidationTip>
                <ValidationTip placement="top" title={props.title + " chỉ được nhập số"}>
                        <ErrorOutline style={{float: "right", margin: "5", width:"15", height:"15", display: numberError === true ? "block" : "none"}} color = "secondary"/>
                </ValidationTip>
            </span>
            {props.type === 'Picker' && 
            <input 
                onChange = {props.onChange}
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
                onChange = {props.onChange}
                className={props.error === true ? "error" : ""}
                value = {props.value}
                disabled = {props.disabled}  
                readOnly={props.readOnly}    
                required = {props.required}/>
            } 
            {props.type === 'Number' && 
            <input   
                onChange = {props.onChange}
                onKeyPress= {e => onlyNumbers(e)}
                onInput = {e => onInput(e)}
                className={(props.error === true || numberError === true) ? "error" : ""}
                value = {props.value}
                disabled = {props.disabled}  
                readOnly={props.readOnly}    
                required = {props.required}/>
            } 
        </div>
    );
}