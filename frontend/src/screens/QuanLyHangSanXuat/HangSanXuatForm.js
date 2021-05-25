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
  MaHangSanXuat: null,
  TenHangSanXuat: "",
};
const HangSanXuatForm = (props) => {
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
    const { value } = e.target;
    setValues({
      ...values,
      TenHangSanXuat: value,
    });
  };
  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <GroupBox
            type="TextBox"
            title="Tên hãng sản xuất"
            value={values.TenHangSanXuat}
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
            {values.MaHangSanXuat === null ? "Thêm" : "Sửa"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default HangSanXuatForm;
