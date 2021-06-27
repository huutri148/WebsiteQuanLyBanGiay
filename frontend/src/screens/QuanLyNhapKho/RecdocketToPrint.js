import {
    Print,
} from '@material-ui/icons';
import {
    IconButton,
    Tooltip,
  } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchListChiTietPhieuNhapKho } from '../../redux/actions/phieuNhapKhoAction';
const RecdocketToPrint = (props) => {
    //props
    const { id, groupBoxes } = props;
    //hooks
    const [details, setDetails] = useState([]);
    //data TODO: add optional later
    const dispatch = useDispatch();
    const detailList = useSelector((state) => state.ListChiTietPhieuNhapKho);
    const { loading: chitietphieunhapkhoLoading, error: chitietphieunhapkhoError, listChiTietPhieuNhapKho: listDetails } = detailList;
    //fetch data
    useEffect(() => {
        if (listDetails != undefined) {
            const detailsData = Object.values(listDetails).reduce((result, value) => {
                result.push({
                    ...value,
                });
                return result;
            }, []);
            setDetails(detailsData);
        }
    }, [listDetails]);
    //fetch data
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchListChiTietPhieuNhapKho(id));
        };
        fetchData();
    }, [dispatch]);
    const print = () => {
        var toPrint = document.getElementById('content');

        var popupWin = window.open('', '_blank', 'width=1000,height=1000'); //create new page     
        popupWin.document.open(); //open new page
        popupWin.document.write('<html><body onload="window.print()">')

        popupWin.document.write(toPrint.innerHTML);
        popupWin.document.write('')
        popupWin.document.write('<p style="text-align:right; padding-right: 50px">')
        popupWin.document.write(', Ngày .... Tháng .... Năm ....')
        popupWin.document.write('<br>')
        popupWin.document.write('</p>')
        popupWin.document.write('<p style="text-align:center;float: right;margin-right: 125px;margin-top: -10px;">')
        popupWin.document.write('Nhân viên')
        popupWin.document.write('<br>')
        popupWin.document.write('(Ký tên)')
        popupWin.document.write('</p>')
        popupWin.document.write('</body></html>');
        popupWin.document.close();
    }
    return (
        <>
            <div id="content">
                <div style={{ display: 'inline-block' }}>
                    <li><b>Cửa Hàng Giày SneakerLand</b></li>
                    <li>Địa chỉ: 29N1, Tân Lập, Đông Hoà, Dĩ An, Bình Dương</li>
                    <li>Số Điện Thoại: 01212801223</li>
                </div>
                <div>
                    <h1 style={{ flexGrow: 1, textAlign: "center" }}>Phiếu Nhập Kho</h1>
                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <tr>
                            <td><b>Số Phiếu Nhập Kho:&nbsp;&nbsp;</b>{id}</td>
                            <td><b>{groupBoxes[0].title}:&nbsp;&nbsp;</b>{groupBoxes[0].value}</td>
                        </tr>
                        <tr>
                            <td><b>{groupBoxes[1].title}:&nbsp;&nbsp;</b>{Number(groupBoxes[1].value).toLocaleString("it-IT")}</td>
                            <td><b>{groupBoxes[2].title}:&nbsp;&nbsp;</b>{groupBoxes[2].value}</td>
                        </tr>
                        <tr>
                            <td><b>{groupBoxes[3].title}:&nbsp;&nbsp;</b>{groupBoxes[3].value}</td>
                            <td><b>{groupBoxes[4].title}:&nbsp;&nbsp;</b>{groupBoxes[4].value}</td>
                        </tr>
                    </table>
                </div>
                <br />
                <div>
                    <table style={{ borderCollapse: "collapse" }}>
                        <tbody>
                            <tr>
                                <th style={{ padding: "0px 10px", border: "1px solid black" }} width="25%">
                                    Tên Giày
                                </th>
                                <th style={{ padding: "0px 10px", border: "1px solid black" }} width="15%">
                                    Giới Tính
                                </th>
                                <th style={{ padding: "0px 10px", border: "1px solid black" }} width="10%">
                                    Size
                                </th>
                                <th style={{ padding: "0px 10px", border: "1px solid black" }} width="15%">
                                    Giá Nhập
                                </th>
                                <th style={{ padding: "0px 10px", border: "1px solid black" }} width="15%">
                                    Số Lượng
                                </th>
                                <th style={{ padding: "0px 10px", border: "1px solid black" }} width="20%">
                                    Thành Tiền
                                </th>
                            </tr>
                            {details.map(item => (
                                <tr>
                                    <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                                        {item.TenGiay}
                                    </td>
                                    <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                                        {item.GioiTinh}
                                    </td>
                                    <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                                        {item.TenSize}
                                    </td>
                                    <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                                        {Number(item.GiaNhap).toLocaleString("it-IT")}
                                    </td>
                                    <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                                        {item.SoLuongNhap}
                                    </td>
                                    <td style={{ padding: "0px 10px", border: "1px solid black" }}>
                                        {Number(item.ThanhTien).toLocaleString("it-IT")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <br />
                    </table>
                </div>
                <br />
            </div>
            <div>
                <Tooltip title="In">
                    <IconButton onClick = {() => print()}>
                        <Print style={{ color: green[500] }}/>
                    </IconButton>
                </Tooltip>
            </div>
        </>
    )
}

export default RecdocketToPrint
