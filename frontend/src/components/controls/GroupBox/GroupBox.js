import { ErrorOutline } from "@material-ui/icons";
import { React, useState } from "react";
import Selector from "../Selector/Selector";
import ValidationTip from "../ValidationTip";
import './GroupBox.css';
export default function GroupBox(props) {
    //set default date
    let date = new Date().getDate();
    if (date < 10) date = '0' + date;
    let month = new Date().getMonth() + 1;
    if (month < 10) month = '0' + month;
    //regex
    const phoneRegex = /^[0-9\b]+$/;
    const [numberError, setNumberError] = useState(false);
    const onlyNumbers = (event) => {
        if (isNaN(event.key))
            setNumberError(true);
    };
    const onInput = (e) => {
        let tmp = e.target.value;
        if (tmp === '' || phoneRegex.test(tmp))
            setNumberError(false);
    }
    const { options, type, title, validationTip, disabled, value, required, defaultValue, onChange, error, readOnly } = props;
    return (
        <div>
            <span style={{
                fontSize: 16,
                fontWeight: 600,
            }}>
                <label>{title}</label>
                <label style={{
                    marginLeft: 5,
                    color: 'Red'
                }}>{required ? '*' : ''}
                </label>
                <ValidationTip placement="top" title={validationTip}>
                    <ErrorOutline style={{ float: "right", margin: "5", width: "15", height: "15", display: error === true && numberError === false ? "block" : "none" }} color="secondary" />
                </ValidationTip>
                <ValidationTip placement="top" title={title + " chỉ được nhập số"}>
                    <ErrorOutline style={{ float: "right", margin: "5", width: "15", height: "15", display: numberError === true ? "block" : "none" }} color="secondary" />
                </ValidationTip>
            </span>
            {type === 'Picker' &&
                <input
                    onChange={onChange}
                    className={error === true ? "error" : ""}
                    required={required}
                    disabled={disabled}
                    type="date"
                    readOnly={readOnly}
                    value={value}
                    defaultValue={defaultValue === null || defaultValue === undefined ? new Date().getFullYear() + "-" + month + "-" + date : defaultValue} />
            }
            {type === 'TextBox' &&
                <input
                    onChange={onChange}
                    className={error === true ? "error" : ""}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required} />
            }
            {type === 'Number' &&
                <input
                    onChange={onChange}
                    onKeyPress={e => onlyNumbers(e)}
                    onInput={e => onInput(e)}
                    className={(error === true || numberError === true) ? "error" : ""}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    defaultValue={defaultValue}
                    required={required} />
            }
            {type === 'Select' &&
                <Selector
                    defaultValue={defaultValue}
                    options={options}
                    onChange={onChange} />
            }
            {type === 'Label' &&
                <input
                    value={value}
                    defaultValue={defaultValue}
                    readOnly={true} />
            }
        </div>
    );
}