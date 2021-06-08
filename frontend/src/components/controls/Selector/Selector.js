import React, { useState } from "react";
import Select from "react-select";
export default function Selector(props) {
  const styles = {
    control: (base) => ({
      ...base,
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 15,
      width: 210,
      height: 38,
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: '38px',
        padding: '0 6px'
      }),
  
      input: (provided, state) => ({
        ...provided,
        margin: '0px',
      }),
  };
  return (
    props.options.length > 0 ? <Select
        placeholder = {props.placeholder}
        onChange={props.onChange}
        options={props.options}
        defaultValue = {props.options[0]}
        styles={styles}
    /> : <Select
    placeholder = {props.placeholder}
    onChange={props.onChange}
    options={props.options}
    isDisabled = {true}
    styles={styles}
/>
  );
}
