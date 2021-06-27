import React, { useState } from "react";
import { storage } from "../../../services/firebase/firebaseConfig";
import {
  Paper,
  makeStyles,
  Typography,
  Divider,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import Select from "react-select";
import Groupbox from "../../../components/controls/GroupBox/GroupBox";
import { Person } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import ImageUpload from "../../../components/controls/ImageUpload";
import { createGiay } from "../../../redux/actions/giayAction";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../../components/controls/ConfirmDialog";
import _ from "lodash";
import {
  defaultGioiTinh,
  initialSanPham,
  QuanLySanPhamTab,
} from "../ThongTinQuanLySanPham";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "darkslateblue",
  },
  paper: {
    margin: theme.spacing(2, 8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    height: "fit-content",
    flexWrap: "wrap",
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "darkslateblue",
  },
  image: {
    objectFit: "cover",
    width: "80%",
    maxHeight: "100%",
  },
  imageCard: {
    padding: "0px 10px 0px 0px",
    margin: "0px 20px 0px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  informationCard: {
    padding: "30px 0px 0px 50px",
  },
  button: {
    margin: "30px 0px 0px 30px",
    height: "50px",
    flewGrow: 1,
    textTransform: "none",
  },
  CheckBox: {
    marginTop: "20px",
  },
}));

const ThemSanPham = (props) => {
  //regex
  const phoneRegex = /^[0-9\b]+$/;

  const { UpdateData, SwitchTab } = props;

  //hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  // State of component
  const [values, setValues] = useState(initialSanPham);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [chosenFile, setChosenFile] = useState("");

  //Select data from store
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const sizeList = useSelector((state) => state.ListSize);
  const mauList = useSelector((state) => state.ListMau);

  const { listHangSanXuat } = brandList;
  const { listSize } = sizeList;
  const { listMau } = mauList;

  //Function to handle

  const handleQuanLyHangSanXuat = () => {
    props.history.push("/admin/brands");
  };
  const handleSelect = (e, name) => {
    setValues({
      ...values,
      [name]: e[name],
    });
  };
  const handleChange = (e, name) => {
    const { value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const saveFile = (file) => {
    setChosenFile(file);
  };
  const handleFirebaseUpload = (file) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            const srcProperty = "Anh";
            const item = {
              ...values,
              [srcProperty]: fireBaseUrl,
            };
            createProduct(item);
            SwitchTab(QuanLySanPhamTab.DanhSachSanPham);
          });
      }
    );
  };
  const handleCheckbox = (e, value, name) => {
    const checkedValues = values["Size"];
    if (e.target.checked) {
      checkedValues.push(value[name]);
    } else {
      const index = checkedValues.find((ch) => ch === value[name]);
      checkedValues.splice(index, 1);
    }
    setValues({
      ...values,
      [name]: checkedValues,
    });
  };
  const createProduct = (item) => {
    dispatch(createGiay(item));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Bạn có muốn thêm sản phẩm không?",
      onConfirm: () => {
        handleFirebaseUpload(chosenFile);
      },
    });
  };

  return (
    <div>
      <Typography component="h1" variant="h5" className={classes.title}>
        Thêm Sản Phẩm
      </Typography>
      <form onSubmit={handleSubmit}>
        <Paper spacing={0} className={classes.paper}>
          <FormControl>
            <label className={classes.cardHeader}>Thông tin sản phẩm</label>
            <Divider variant="middle" />
            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid xs={4} className={classes.imageCard}>
                <ImageUpload className={classes.image} SaveFile={saveFile} />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ textTransform: "none", marginTop: "30px" }}
                  startIcon={<Person />}
                  type="submit"
                >
                  Thêm Mới
                </Button>
              </Grid>
              <Grid xs={6} className={classes.informationCard}>
                <Groupbox
                  type="TextBox"
                  title="Tên Giày"
                  required={true}
                  onChange={(e) => handleChange(e, "TenGiay")}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "block", width: "55%" }}>
                    <label
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {" "}
                      Hãng sản xuất:
                    </label>
                    <label
                      style={{
                        marginLeft: 5,
                        color: "Red",
                      }}
                    >
                      *
                    </label>
                    <Select
                      value={listHangSanXuat[values.MaHSX]}
                      onChange={(e) => handleSelect(e, "MaHangSanXuat")}
                      name="MaHangSanXuat"
                      isSearchable="true"
                      required="true"
                      options={_.map(listHangSanXuat, (value) => {
                        return value;
                      })}
                      getOptionLabel={(option) => option.TenHangSanXuat}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<Person />}
                    onClick={handleQuanLyHangSanXuat}
                  >
                    Quản lý hãng sản xuất
                  </Button>
                  <div
                    style={{
                      display: "block",
                      width: "50%",
                      margin: "15px 0px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {" "}
                      Giới tính:
                    </label>
                    <label
                      style={{
                        marginLeft: 5,
                        color: "Red",
                      }}
                    >
                      *
                    </label>
                    <Select
                      default={defaultGioiTinh[0]}
                      onChange={(e) => handleSelect(e, "GioiTinh")}
                      name="GioiTinh"
                      options={defaultGioiTinh}
                      getOptionLabel={(option) => option.GioiTinh}
                    />
                  </div>
                  <div
                    style={{
                      display: "block",
                      flexGrow: 1,
                      margin: "15px 0px 15px 30px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {" "}
                      Màu sắc:
                    </label>
                    <label
                      style={{
                        marginLeft: 5,
                        color: "Red",
                      }}
                    >
                      *
                    </label>
                    <Select
                      value={listMau[values.MaMau]}
                      onChange={(e) => handleSelect(e, "MaMau")}
                      name="MaMau"
                      options={_.map(listMau, (value) => {
                        return value;
                      })}
                      getOptionLabel={(option) => option.TenMau}
                    />
                  </div>
                  <div
                    style={{
                      display: "block",
                      flexGrow: 2,
                      width: "40%",
                      margin: "15px 0px",
                    }}
                  >
                    <Groupbox
                      type="Number"
                      title="Giá nhập"
                      required={true}
                      onChange={(e) => handleChange(e, "DonGiaNhap")}
                    />
                  </div>
                  <div
                    style={{
                      display: "block",
                      flexGrow: 3,
                      margin: "15px 0px 15px 30px",
                    }}
                  >
                    <Groupbox
                      type="TextBox"
                      title="Tỷ suất lợi nhuận"
                      required={true}
                      onChange={(e) => handleChange(e, "TyLeLoiNhuan")}
                    />
                  </div>
                  <div style={{ width: "60%", flexGrow: 1 }}>
                    <Groupbox
                      type="TextBox"
                      title="Mô tả"
                      required={false}
                      onChange={(e) => handleChange(e, "MoTa")}
                    />
                  </div>

                  <div className={classes.CheckBox}>
                    <FormLabel component="legend">Chọn Size</FormLabel>
                    <FormGroup aria-label="position" row>
                      {_.map(listSize, (value) => {
                        return (
                          <FormControlLabel
                            value={value.MaSize}
                            control={<Checkbox color="primary" />}
                            label={value.TenSize}
                            onChange={(e) => {
                              handleCheckbox(e, value, "MaSize");
                            }}
                          />
                        );
                      })}
                    </FormGroup>
                  </div>
                </div>
              </Grid>
              <Grid xs={12}></Grid>
            </Grid>
          </FormControl>
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </Paper>
      </form>
    </div>
  );
};

export default withRouter(ThemSanPham);
