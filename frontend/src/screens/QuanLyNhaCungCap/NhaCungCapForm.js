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
  const handleChange = (e) => {
    const { key, value } = e.target;
    setValues({
      ...values,
      [e.target.key]: value,
    });
  };
  return (
    <form className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <GroupBox
            type="TextBox"
            title="Tên nhà cung cấp"
            key="TenNhaCungCap"
            value={values.TenNhaCungCap}
            onChange={handleChange}
            readOnly={false}
            required={true}
          />
          <GroupBox
            type="TextBox"
            title="Địa Chỉ"
            key="DiaChi"
            value={values.DiaChi}
            onChange={handleChange}
            readOnly={false}
            required={true}
          />
        </Grid>
        <Grid item xs={6}>
          <GroupBox
            type="TextBox"
            title="SDT"
            key="SDT"
            value={values.SDT}
            onChange={handleChange}
            readOnly={false}
            required={true}
          />
          <GroupBox
            type="TextBox"
            title="Email"
            key="Email"
            value={values.Email}
            onChange={handleChange}
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
