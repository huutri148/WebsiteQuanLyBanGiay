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
    return (
        <>
            <label
                className={classes.cardHeader}
                style={{ textAlign: "center" }}>
                {props.cardHeader}
              </label>
              <hr className={classes.hr} />
              {props.GroupBoxes.map((item) => (
                <GroupBox
                    type={item.type}
                    title={item.title}
                    validationTip = {item.validationTip}
                    disabled={item.disabled}
                    value = {item.value}
                    required={item.required}
                    onChange = {item.disabled === 'disabled' ? e => item.onChange(e,item.title) : null}
                    error = {item.error}/>
              ))}
              <Button size="large" variant="contained" color="primary" onClick = {props.onClick} disabled = {props.disabled}>
                {props.buttonContent}
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
