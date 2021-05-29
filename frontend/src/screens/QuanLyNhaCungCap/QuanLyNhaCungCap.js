import { React, useState, useEffect } from "react";
import {
  InputAdornment,
  Paper,
  Toolbar,
  TableBody,
  makeStyles,
  TableContainer,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import useTable from "../../components/useTable";
import Input from "../../components/controls/Input";
import { Search, Add, DeleteOutlined, Edit } from "@material-ui/icons";
import Popup from "../../components/controls/Popup";
import { useDispatch, useSelector } from "react-redux";
import * as nhaCungCapAction from "./../../actions/nhaCungCapAction";
import NhaCungCapForm from "./NhaCungCapForm";
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
    padding: theme.spacing(0, 8),
  },
  newButton: {
    position: "absolute",
    top: "50%",
    right: "10%",
    color: green[500],
  },
}));

const headCells = [
  { id: "MaNhaCungCap", label: "Mã" },
  { id: "TenNhaCungCap", label: "Tên" },
  { id: "DiaChi", label: "Địa Chỉ", width: "30%" },
  { id: "SDT", label: "SDT" },
  { id: "Email", label: "Email" },
  { id: "actions" },
];
const QuanLyNhaCungCap = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState();
  const [recordForEdit, setRecordForEdit] = useState(null);
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
  const { success: updateSuccess, updateError } = updateSupplier;
  const { success: deleteSuccess, deleteError } = deleteSupplier;
  const [tableData, setTableData] = useState([]);
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
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(tableData, headCells, filterFn);

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
  const handleDelete = (item) => {
    setRecordForEdit(item);
    // Note add confirm
    dispatch(nhaCungCapAction.deleteNhaCungCap(item.MaNhaCungCap));
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
            <TableContainer className={classes.table}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    <TableRow
                      key={item.MaNhaCungCap}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.MaNhaCungCap}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenNhaCungCap}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          width: "30%",
                        }}
                      >
                        {item.DiaChi}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.SDT}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.Email}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            openInPopup(item);
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(item)}
                        >
                          <DeleteOutlined fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </TableContainer>
          </Paper>
          <Popup
            title="Thông tin nhà cung cấp"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <NhaCungCapForm editItem={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
        </div>
      )}
    </>
  );
};

export default QuanLyNhaCungCap;
