import {
    makeStyles,
    Paper,
    Grid,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Checkbox,
    Toolbar,
    IconButton,
    Button,
    InputAdornment,
    Typography,
    FormControlLabel
} from "@material-ui/core";
import {
    Search,
    Add,
    Assignment,
    Edit,
    Delete,
} from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { React, useState, useEffect } from "react";
import GroupBox from "../../../components/controls/GroupBox/GroupBox";
import { useDispatch, useSelector } from "react-redux";
import Selector from "../../../components/controls/Selector/Selector";
import Popup from "../../../components/controls/Popup";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import { fetchListChucVu, updateChucVu, createChucVu, deleteChucVu, fetchListPhanQuyen, addPermissions } from "../../../redux/actions/chucVuAction";
const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(0, 4),
        padding: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        height: "fit-content",
    },
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
    titleHeader: {
        padding: theme.spacing(4, 0),
        textTransform: "none",
        fontSize: 32,
        color: "darkslateblue",
        fontWeight: "Bold",
    },
    td: {
        padding: "0px 10px",
    },
    table: {
        padding: theme.spacing(0, 1),
        width: "100%"
    },
    content: {
        display: "flex",
        justifyContent: "center",
    },
    searchInput: {
        width: "40%",
    },
    newButton: {
        position: "absolute",
        top: "50%",
        right: "10%",
        color: green[500],
    },
}));
const headCells = [
    { id: "MaQuyen", label: "Mã Quyền" },
    { id: "TenQuyen", label: "Tên Quyền" },
    { id: "actions" },
];
const DanhSachChucVu = () => {
    //styles
    const classes = useStyles();
    //data
    const dispatch = useDispatch();
    const dutyList = useSelector((state) => state.ListChucVu);
    const { loading: dutyLoading, listChucVu } = dutyList;
    const permissionList = useSelector((state) => state.ListPhanQuyen);
    const { loading: permissionLoading, listPhanQuyen } = permissionList;
    //hooks
    const initPermissions = [
        { MaQuyen: 1, TenQuyen: "Quản Lý Sản Phẩm", IsChecked: false },
        { MaQuyen: 2, TenQuyen: "Quản Lý Bán Hàng", IsChecked: false },
        { MaQuyen: 3, TenQuyen: "Quản Lý Người Dùng", IsChecked: false },
        { MaQuyen: 4, TenQuyen: "Quản Lý Nhà Cung Cấp", IsChecked: false },
        { MaQuyen: 5, TenQuyen: "Quản Lý Đặt Hàng", IsChecked: false },
        { MaQuyen: 6, TenQuyen: "Quản Lý Nhập Kho", IsChecked: false },
        { MaQuyen: 7, TenQuyen: "Quản Lý Giỏ Hàng", IsChecked: false },
        { MaQuyen: 8, TenQuyen: "Báo Cáo Lợi Nhuận", IsChecked: false },
        { MaQuyen: 9, TenQuyen: "Báo Cáo Tồn Kho", IsChecked: false },
        { MaQuyen: 10, TenQuyen: "Báo Cáo Bán Hàng", IsChecked: false }];
    const [permissions, setPermissions] = useState(initPermissions);
    const [duties, setDuties] = useState([]);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [openAddPopup, setOpenAddPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [openDetailPopup, setOpenDetailPopup] = useState(false);
    const [duty, setDuty] = useState()
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    //tables
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
        useTable(duties, headCells, filterFn);
    //handle
    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value == "") return items;
                else
                    return items.filter((x) =>
                        x.TenChucVu.toLowerCase().includes(target.value)
                    );
            },
        });
    };
    const handleAdd = () => {
        setOpenAddPopup(true);
        setPermissions(initPermissions);
    };
    const handleEdit = (item) => {
        setOpenEditPopup(true);
        setDuty(item);
    };
    const handleDelete = (item) => {
        setOpenDeletePopup(true);
        setDuty(item);
    };
    const handleDetail = (item) => {
        setOpenDetailPopup(true);
        setDuty(item);
    };
    // Fetch data from API
    useEffect(() => {
        if (listChucVu != undefined) {
            const cvdata = Object.values(listChucVu).reduce((result, value) => {
                result.push({
                    ...value,
                });
                return result;
            }, []);
            setDuties(cvdata);
        }
    }, [listChucVu]);
    useEffect(() => {
        if (listPhanQuyen != undefined) {
            const tempPermissions = initPermissions;
            const cvdata = Object.values(listPhanQuyen).reduce((result, value) => {
                result.push({
                    ...value,
                });
                tempPermissions[value.MaQuyen - 1].IsChecked = true;
                return result;
            }, []);
            setPermissions(tempPermissions);
        }
    }, [listPhanQuyen, duty]);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchListChucVu());
        };
        fetchData();
    }, [dispatch]);
    useEffect(() => {
        const fetchData = async () => {
            if (duty !== undefined) {
                await dispatch(fetchListPhanQuyen(duty.MaChucVu));
            }
        };
        fetchData();
    }, [dispatch, duty]);
    return (
        <div>
            <Typography component="h1" variant="h5" className={classes.titleHeader}>
                Phân Quyền
            </Typography>
            <Paper className={classes.paper}>
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
                        onClick={handleAdd}
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
                                    key={item.MaChiTietGiay}
                                    style={
                                        index % 2
                                            ? { background: "#eee" }
                                            : { background: "white" }
                                    }
                                >
                                    <TableCell width="40%" component="td" scope="row">
                                        {item.MaChucVu}
                                    </TableCell>
                                    <TableCell width="40%" component="td" scope="row">
                                        {item.TenChucVu}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleDetail(item)}
                                        >
                                            <Assignment fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDelete(item)}
                                        >
                                            <Delete fontSize="small" />
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
                title="Thêm Chức Vụ"
                openPopup={openAddPopup}
                setOpenPopup={setOpenAddPopup}
            >
                <div style={{ display: "block", fontSize: 24 }}>
                    <GroupBox
                        type="TextBox"
                        title="Tên Chức Vụ"
                        onChange = {(e) => duty.TenChucVu = e.target.value}
                    />
                    {/* <table>
                    {
                        permissions.map(item => (
                        <tr><FormControlLabel 
                        control={<Checkbox checked = {permissions[item.MaQuyen - 1].IsChecked} 
                        onChange = {() =>{
                            let tmp = [...permissions];
                            tmp[item.MaQuyen - 1].IsChecked = !tmp[item.MaQuyen - 1].IsChecked; 
                            setPermissions(tmp)} }/>} 
                        label= {item.TenQuyen} /></tr>))
                    }
                    </table> */}
                    <Button size="large" variant="contained" color="primary" onClick={() => {dispatch(createChucVu({TenChucVu: duty.TenChucVu})) }}>
                        Thêm Chức Vụ
                    </Button>
                </div>
            </Popup>
            <Popup
                title="Sửa Chức Vụ"
                openPopup={openEditPopup}
                setOpenPopup={setOpenEditPopup}
            >
                <GroupBox
                    type="TextBox"
                    title="Tên Chức Vụ"
                    defaultValue={duty !== undefined && duty.TenChucVu}
                    onChange = {(e) => duty.TenChucVu = e.target.value}
                />
                <table>
                    {
                        permissions.map(item => (
                        <tr><FormControlLabel 
                        control={<Checkbox checked = {permissions[item.MaQuyen - 1].IsChecked} 
                        onChange = {() =>{
                            let tmp = [...permissions];
                            tmp[item.MaQuyen - 1].IsChecked = !tmp[item.MaQuyen - 1].IsChecked; 
                            setPermissions(tmp)} }/>} 
                        label= {item.TenQuyen} /></tr>))
                    }
                </table>
                <Button size="large" variant="contained" color="primary" 
                    onClick={() => {
                        var tmpDuty = {...duty, ListPhanQuyen: []};
                        permissions.forEach(element => {
                            if(element.IsChecked === true)
                                tmpDuty.ListPhanQuyen.push({MaQuyen: element.MaQuyen});
                        });
                        console.log(tmpDuty);
                        dispatch(updateChucVu(tmpDuty.MaChucVu, tmpDuty))
                        }}>
                    Lưu Thay Đổi
                </Button>
            </Popup>
            <Popup
                title="Xoá Chức Vụ"
                openPopup={openDeletePopup}
                setOpenPopup={setOpenDeletePopup}
            >
                <div style={{ display: "block", fontSize: 24, textAlign: "center" }}>
                    <p>Bạn Có Chắc Muốn Xoá Chức Vụ Này ?</p>
                    <Button size="large" variant="contained" color="primary" onClick={() => { }}>
                        Xác Nhận
                    </Button>
                </div>
            </Popup>
            <Popup
                title="Chi Tiết Chức Vụ"
                openPopup={openDetailPopup}
                ignored = {listPhanQuyen}
                setOpenPopup={setOpenDetailPopup}
            >
                <GroupBox
                    type="Label"
                    title="Tên Chức Vụ"
                    value={duty !== undefined && duty.TenChucVu}
                />
                <table>
                    {permissions.map(item => (<tr><FormControlLabel disabled control={<Checkbox checked = {item.IsChecked} />} label= {item.TenQuyen} /></tr>))}
                </table>
            </Popup>
        </div >
    )
}

export default DanhSachChucVu
