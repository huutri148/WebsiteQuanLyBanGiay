import {
    makeStyles,
    Paper,
    withStyles,
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
import Loading from "../../../components/Loadable/Loading";
import Popup from "../../../components/controls/Popup";
import useTable from "../../../components/useTable";
import Input from "../../../components/controls/Input";
import ConfirmDialog from "../../../components/controls/ConfirmDialog";
import { fetchListChucVu, updateChucVu, createChucVu, deleteChucVu, fetchListQuyen } from "../../../redux/actions/chucVuAction";
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
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const DanhSachChucVu = () => {
    //styles
    const classes = useStyles();
    //data
    const dispatch = useDispatch();
    const dutyList = useSelector((state) => state.ListChucVu);
    const { loading: dutyLoading, listChucVu } = dutyList;
    const permissionList = useSelector((state) => state.ListQuyen);
    const { loading: permissionLoading, listQuyen } = permissionList;
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
        { MaQuyen: 9, TenQuyen: "Báo Cáo Bán Hàng", IsChecked: false },
        { MaQuyen: 10, TenQuyen: "Quản Lý Phiếu Chi", IsChecked: false}];
    const [permissions, setPermissions] = useState(initPermissions);
    const [duties, setDuties] = useState([]);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [openAddPopup, setOpenAddPopup] = useState(false);
    const [openDetailPopup, setOpenDetailPopup] = useState(false);
    const [update, setUpdate] = useState(false);
    const [duty, setDuty] = useState();
    const [createDuty, setCreateDuty] = useState();
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
        setCreateDuty({});
    };
    const handleEdit = (item) => {
        setOpenEditPopup(true);
        setDuty(item);
    };
    const handleDetail = (item) => {
        setOpenDetailPopup(true);
        setDuty(item);
    };
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });
    const handleDelete = (item) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: "Bạn có muốn xóa chức vụ này không?",
            onConfirm: () => {
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false,
                });
                dispatch(deleteChucVu(item.MaChucVu))
                .then(setUpdate(!update));
            },
        });
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
        console.log(permissionList);
        if (listQuyen != undefined) {
            const tempPermissions = initPermissions;
            Object.values(listQuyen).forEach(item => {
                if(item != 0)
                    tempPermissions[item - 1].IsChecked = true;
            }, []);
            setPermissions(tempPermissions);
        }
    }, [listQuyen]);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchListChucVu());
        };
        fetchData();
    }, [dispatch, update]);
    useEffect(() => {
        const fetchData = async () => {
            if (duty !== undefined) {
                await dispatch(fetchListQuyen(duty.MaChucVu));
            }
        };
        fetchData();
    }, [dispatch, duty]);
    return (
        <>
            {dutyLoading ?
                <Loading />
                :
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
                                Thêm Mới
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
                                onChange={(e) => createDuty.TenChucVu = e.target.value}
                            />
                            <br/>
                            <div style = {{textAlign: "center"}}>
                            <Button size="large" variant="contained" color="primary"
                                onClick={() => {
                                    dispatch(createChucVu({ TenChucVu: createDuty.TenChucVu }))
                                    .then(setUpdate(!update))
                                    .then(setOpenAddPopup(false));
                                }}>
                                Thêm Chức Vụ
                            </Button>
                            </div>
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
                            onChange={(e) => duty.TenChucVu = e.target.value}
                        />
                        <table>
                            {
                                permissions.map(item => (
                                    <tr><FormControlLabel
                                        control={<Checkbox checked={permissions[item.MaQuyen - 1].IsChecked}
                                            onChange={() => {
                                                let tmp = [...permissions];
                                                tmp[item.MaQuyen - 1].IsChecked = !tmp[item.MaQuyen - 1].IsChecked;
                                                setPermissions(tmp)
                                            }} />}
                                        label={item.TenQuyen} /></tr>))
                            }
                        </table>
                        <br />
                        <div style = {{textAlign: "center"}}>
                        <Button size="large" variant="contained" color="primary"
                            onClick={() => {
                                var tmpDuty = { ...duty, ListPhanQuyen: [] };
                                permissions.forEach(element => {
                                    if (element.IsChecked === true)
                                        tmpDuty.ListPhanQuyen.push({ MaQuyen: element.MaQuyen });
                                });
                                dispatch(updateChucVu(tmpDuty.MaChucVu, tmpDuty))
                                .then(setUpdate(!update))
                                .then(setOpenEditPopup(false));
                            }}>
                            Lưu Thay Đổi
                        </Button>
                        </div>
                    </Popup>
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                    <Popup
                        title="Chi Tiết Chức Vụ"
                        openPopup={openDetailPopup}
                        setOpenPopup={setOpenDetailPopup}
                    >
                        <GroupBox
                            type="Label"
                            title="Tên Chức Vụ"
                            value={duty !== undefined && duty.TenChucVu}
                        />
                        <table>
                            {permissions.map(item =>
                            (<tr><FormControlLabel
                                control={<GreenCheckbox checked={item.IsChecked} />}
                                label={item.TenQuyen} /></tr>))}
                        </table>
                    </Popup>
                </div >
            }
        </>
    )
}

export default DanhSachChucVu
