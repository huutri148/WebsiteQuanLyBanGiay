import React, {useState} from "react";
import './Selector.css';
import ShopLogo from '../../../images/logo.png'
export default function Selector (props) {
    const [value, setValue] = useState(0);
    const handleChange = e =>{
        setValue(e.value);
    }
    const options = [
        { value: "Abe", label: "Abe", imgSrc: ShopLogo },
        { value: "John", label: "John", imgSrc: ShopLogo },
        { value: "Dustin", label: "Dustin", imgSrc: ShopLogo }
      ];
    const formatOptionLabel = ({ value, label, imgSrc }) => (
    <div style={{ display: "flex", height: 80, }}>
        <div>{label}</div>
        <img style={{ width: 80, height: 80, }} src={ShopLogo} alt="logo"/>
    </div>
    );
    return(
        <>
            <label style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 5}}>
                    {props.title}
            </label>
            <select value = {value} onChange={handleChange}
                defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}/>
        </>
    );
}