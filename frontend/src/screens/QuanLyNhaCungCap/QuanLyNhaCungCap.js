import { React, useState, useEffect } from "react";
import {
  InputAdornment,
  Paper,
  Toolbar,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Input from "../../components/controls/Input";
import { Search, Add } from "@material-ui/icons";
import Popup from "../../components/controls/Popup";
import { useDispatch, useSelector } from "react-redux";
import * as nhaCungCapAction from "./../../actions/nhaCungCapAction";
import NhaCungCapForm from "./NhaCungCapForm";
import ConfirmDialog from "../../components/controls/ConfirmDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NhaCungCapTable from "./NhaCungCapTable";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(4, 0),
    textTransform: "none",
    fontSize: 32,
    color: "darkslateblue",
    fontWeight: "Bold",
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    width: "40%",
  },
  table: {
    margin: theme.spacing(0, 8),
  },
  newButton: {
    position: "absolute",
    top: "50%",
    right: "10%",
    color: green[500],
  },
}));

const QuanLyNhaCungCap = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const listSupplier = useSelector((state) => state.ListNhaCungCap);
  const createSupplier = useSelector((state) => state.CreateNhaCungCap);
  const updateSupplier = useSelector((state) => state.UpdateNhaCungCap);
  const deleteSupplier = useSelector((state) => state.DeleteNhaCungCap);
  const {
    loading: listLoading,
    error: listError,
    listNhaCungCap,
  } = listSupplier;
  const { success: createSuccess, error: createError } = createSupplier;
  const { success: updateSuccess, error: updateError } = updateSupplier;
  const { success: deleteSuccess, error: deleteError } = deleteSupplier;

  const addOrEdit = (item) => {
    if (item.MaNhaCungCap === null) {
      console.log(item);
      dispatch(
        nhaCungCapAction.createNhaCungCap({
          ...item,
        })
      );
    } else {
      dispatch(nhaCungCapAction.updateNhaCungCap(item.MaNhaCungCap, item));
    }
    setRecordForEdit(null);
    setOpenPopup(false);
  };
  // Fetch data from API
  useEffect(() => {
    const data = Object.values(listNhaCungCap).reduce((result, value) => {
      result.push({
        ...value,
      });
      return result;
    }, []);
    setTableData(data);
  }, [flag]);
  // Props in Screens

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(nhaCungCapAction.fetchListNhaCungCap());
      setFlag(!flag);
    };

    fetchData();
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  const [selectedItem, setSelectedItem] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const handleNew = () => {
    setOpenPopup(true);
    setRecordForEdit(null);
  };
  const deletedItem = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setRecordForEdit(item);
    // Note add confirm
    dispatch(nhaCungCapAction.deleteNhaCungCap(item.MaNhaCungCap));
  };
  const handleDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: true,
      title: "Bạn có muốn xóa nhà cung cấp không?",
      onConfirm: () => {
        deletedItem(item);
      },
    });
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  return (
    <>
      {listLoading ? (
        <h1>Loading </h1>
      ) : (
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Quản lý nhà cung cấp
          </Typography>
          <Paper>
            <Toolbar className={classes.content}>
              <Input
                label="Search"
                className={classes.searchInput}
                style={{ marginTop: "30px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
              <Button
                variant="outlined"
                startIcon={<Add />}
                className={classes.newButton}
                onClick={handleNew}
              >
                New
              </Button>
            </Toolbar>
            <NhaCungCapTable
              className={classes.table}
              HandleDelete={handleDelete}
              HandleEdit={openInPopup}
              TableData={tableData}
            />
          </Paper>
          <Popup
            title="Thông tin nhà cung cấp"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <NhaCungCapForm editItem={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
          <ToastContainer autoClose={2000} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </div>
      )}
    </>
  );
};

export default QuanLyNhaCungCap;
