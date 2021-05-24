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
import {
  fetchListHangSanXuat,
  createHangSanXuat,
  updateHangSanXuat,
  deleteHangSanXuat,
} from "./../../actions/hangSanXuatAction";
import HangSanXuatForm from "./HangSanXuatForm";
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
  { id: "MaHangSanXuat", label: "Mã hãng sản xuất" },
  { id: "TenHangSanXuat", label: "Tên hãng sản xuất" },
  { id: "actions" },
];
const QuanLyHangSanXuat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const brandList = useSelector((state) => state.ListHangSanXuat);
  const createBrand = useSelector((state) => state.CreateHangSanXuat);
  const updateBrand = useSelector((state) => state.UpdateHangSanXuat);
  const deleteBrand = useSelector((state) => state.DeleteHangSanXuat);
  const {
    loading: brandLoading,
    error: hangSanXuatError,
    listHangSanXuat,
  } = brandList;
  const { success: createSuccess, error: createError } = createBrand;
  const { success: updateSuccess, updateError } = updateBrand;
  const { success: deleteSuccess, deleteError } = deleteBrand;
  const [tableData, setTableData] = useState([]);
  const addOrEdit = (item) => {
    if (item.MaHangSanXuat === null) {
      console.log(item);
      dispatch(
        createHangSanXuat({
          TenHangSanXuat: item.TenHangSanXuat,
        })
      );
    } else {
      dispatch(updateHangSanXuat(item.MaHangSanXuat, item));
    }
    setRecordForEdit(null);
    setOpenPopup(false);
  };
  // Fetch data from API
  useEffect(() => {
    const data = Object.values(listHangSanXuat).reduce((result, value) => {
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
      await dispatch(fetchListHangSanXuat());
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
        if (target.value == "") return items;
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
    dispatch(deleteHangSanXuat(item.MaHangSanXuat));
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  return (
    <>
      {brandLoading ? (
        <h1>Loading </h1>
      ) : (
        <div>
          <Typography component="h1" variant="h5" className={classes.title}>
            Quản lý hãng sản xuất
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
                      key={item.MaHangSanXuat}
                      style={
                        index % 2
                          ? { background: "#eee" }
                          : { background: "white" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {item.MaHangSanXuat}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.TenHangSanXuat}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            openInPopup(item);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(item)}
                        >
                          <DeleteOutlined />
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
            title="Hãng sản xuất"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <HangSanXuatForm editItem={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
        </div>
      )}
    </>
  );
};

export default QuanLyHangSanXuat;
