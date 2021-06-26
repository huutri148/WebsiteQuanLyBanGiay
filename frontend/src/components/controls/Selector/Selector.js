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
  const {placeholder, onChange,options, defaultValue} = props;
  return (
    defaultValue === undefined ?
    (
      options.length > 0 
      ? 
      <Select
        placeholder = {placeholder}
        onChange={onChange}
        options={options}
        defaultValue = {options[0]}
        styles={styles}
      /> 
      : 
      <Select
        placeholder = {placeholder}
        onChange={onChange}
        options={options}
        isDisabled = {true}
        styles={styles}
      />
    )
    :
    (
      <Select
        placeholder = {placeholder}
        onChange={onChange}
        options={options}
        defaultValue = {defaultValue}
        styles={styles}
      /> 
    )
  );
}
