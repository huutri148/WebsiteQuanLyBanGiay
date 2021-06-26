import React from 'react'
import {
    Checkbox,
    FormControlLabel
} from "@material-ui/core";
const DanhSachPhanQuyen = (props) => {
    const {permissions} = props;
    return (
        <div>
            <table>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 1) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Sản Phẩm" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 2) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Bán Hàng" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 3) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Người Dùng" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 4) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Nhà Cung Cấp" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 5) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Đặt Hàng" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 6) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Nhập Kho" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 7) === undefined ? <Checkbox /> : <Checkbox checked />} label="Quản Lý Giỏ Hàng" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 9) === undefined ? <Checkbox /> : <Checkbox checked />} label="Báo Cáo Lợi Nhuận" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 9) === undefined ? <Checkbox /> : <Checkbox checked />} label="Báo Cáo Tồn Kho" /></tr>
                <tr><FormControlLabel disabled control={permissions.find(e => e.MaQuyen == 10) === undefined ? <Checkbox /> : <Checkbox checked />} label="Báo Cáo Bán Hàng" /> </tr>
            </table>
        </div>
    )
}

export default DanhSachPhanQuyen
