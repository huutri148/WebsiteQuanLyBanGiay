import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import GroupBox from './GroupBox/GroupBox';
const useStyles = makeStyles((theme) => ({
    cardHeader: {
      fontSize: 24,
      fontWeight: "600",
      color: "darkslateblue",
    },
    hr: {
      border: 0,
      borderTop: "1px solid #eee",
      width: "100%",
    },
  }));
const InfoField = (props) => {
    const classes = useStyles();
    const {cardHeader,GroupBoxes,buttonContent,onClick,disabled} = props;
    return (
        <>
            <label
                className={classes.cardHeader}
                style={{ textAlign: "center" }}>
                {cardHeader}
              </label>
              <hr className={classes.hr} />
              {GroupBoxes.map((item,index) => (
                <GroupBox
                    key = {index}
                    options = {item.options}
                    type={item.type}
                    title={item.title}
                    validationTip = {item.validationTip}
                    disabled={item.disabled}
                    value = {item.value}
                    readOnly = {item.readOnly}
                    required={item.required}
                    defaultValue = {item.defaultValue}
                    onChange = {item.onChange === undefined ? null : e => item.onChange(e)}
                    error = {item.error}/>
              ))}
              <Button size="large" variant="contained" color="primary" onClick = {onClick} disabled = {disabled}>
                {buttonContent}
              </Button>
              <hr className={classes.hr} />
              <label
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Lưu ý: Tiền được tính theo VNĐ
              </label>
        </>
    )
}

export default InfoField
