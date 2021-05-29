import React, { useState, useEffect } from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import GroupBox from "../../components/controls/GroupBox/GroupBox";
const useStyles = makeStyles((theme) => ({
  cardHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "darkslateblue",
  },
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));
const initialValues = {
  MaNhaCungCap: null,
  TenNhaCungCap: "",
  DiaChi: "",
  SDT: "",
  Email: "",
};
const NhaCungCapForm = (props) => {
  const classes = useStyles();
  const { addOrEdit, editItem } = props;
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values);
  };
  useEffect(() => {
    if (editItem != null)
      setValues({
        ...editItem,
      });
  }, [editItem]);
  const handleChange = (e, title) => {
    const { value } = e.target;
    setValues({
      ...values,
      [title]: value,
    });
  };
  const checkRequiredValidation = (val, name) => {
    if (name === "SDT") {
      if (val === null || val === "" || val === undefined) return true;
    }
    return false;
  };
  return (
    <form className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <GroupBox
            type="TextBox"
            title="Tên nhà cung cấp"
            value={values.TenNhaCungCap}
            validationTip="Tên Nhà Cung Cấp không được trống"
            onChange={(e) => handleChange(e, "TenNhaCungCap")}
            readOnly={false}
            required={true}
          />
          <GroupBox
            type="TextBox"
            title="Địa Chỉ"
            value={values.DiaChi}
            onChange={(e) => handleChange(e, "DiaChi")}
            readOnly={false}
            required={true}
          />
        </Grid>
        <Grid item xs={6}>
          <GroupBox
            type="Number"
            title="SDT"
            value={values.SDT}
            error={false}
            onChange={(e) => handleChange(e, "SDT")}
            validationTip="Số Điện Thoại không được trống"
            readOnly={false}
            required={true}
          />
          <GroupBox
            type="TextBox"
            title="Email"
            value={values.Email}
            onChange={(e) => handleChange(e, "Email")}
            readOnly={false}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {values.MaNhaCungCap === null ? "Thêm" : "Sửa"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NhaCungCapForm;
