import React from "react";
import { TextField } from "@material-ui/core";
export default function GroupBox(props) {
  return (
    <div style={{ display: "grid" }}>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 5,
        }}
      >
        <label>{props.title}</label>
        <label
          style={{
            marginLeft: 5,
            color: "Red",
          }}
        >
          {props.required ? "*" : ""}
        </label>
      </span>
      {props.type === "Picker" && (
        <TextField
          required={props.required}
          variant="outlined"
          size="small"
          type="date"
          defaultValue={
            new Date().getMonth() + 1 > 9
              ? new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate()
              : new Date().getFullYear() +
                "-0" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate()
          }
          InputProps={{
            readOnly: props.readOnly,
          }}
          style={{
            fontSize: 14,
            marginBottom: 15,
          }}
        ></TextField>
      )}
      {props.type === "TextBox" && (
        <TextField
          required={props.required}
          variant="outlined"
          size="small"
          InputProps={{
            readOnly: props.readOnly,
          }}
          value={props.value === undefined ? "" : props.value}
          style={{
            fontSize: 14,
            marginBottom: 15,
          }}
        ></TextField>
      )}
    </div>
  );
}
