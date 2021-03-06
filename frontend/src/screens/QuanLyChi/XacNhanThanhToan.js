import {React, useState} from 'react'
import { Button, makeStyles } from '@material-ui/core'
import GroupBox from '../../components/controls/GroupBox/GroupBox';
import moment from 'moment'
import { createPhieuChi } from '../../redux/actions/phieuChiAction';
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
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
  }));
const XacNhanThanhToan = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.User);
    const { userInfo } = user;
    // props
    const {recdocket} = props;
    // regex
    const phoneRegex = /^[0-9\b]+$/;
    // hook
    const [total, setTotal] = useState(Number(recdocket.TongTien));
    const [totalError, setTotalError] = useState(false);
    const [note, setNote] = useState("");
    const [date, setDate] = useState(moment(recdocket.NgayNhapKho).format("YYYY-MM-DD"));
    // change
    const onTotalChange = (e) => {
        let val = e.target.value.split(".");
        let tmp = "";
        val.forEach(element => { tmp += element;});
        if (tmp === "")
            setTotal(0);
        else if (tmp === 0 || phoneRegex.test(tmp)) {
            setTotal(Number(tmp));
            Number(tmp) > 0 ? setTotalError(false) : setTotalError(true);
        }
      };
    const onNoteChange = (e) => {
        setNote(e.target.value)
      };
    const onDateChange = (e) => {
        setDate(e.target.value)
      };
  // submit
  const handleSubmitClick = () => {
      let record = {
        MaNguoiDung: userInfo.MaNguoiDung,
        SoPhieuNhapKho: recdocket.SoPhieuNhapKho,
        TongTien: total,
        NgayLap: date,
        GhiChu: note,
        };
      //to do: Add success later
      dispatch(createPhieuChi(record))
      .then(props.setValue(1));
  };
    return (
        <div>
            <table>
                <tr>
                    <td>
                        <GroupBox
                            key = {1}
                            type="Label"
                            title="T??n Nh?? Cung C???p"
                            value = {recdocket.TenNhaCungCap}
                            disabled="disabled"
                        />
                    </td>
                    <td>
                        <GroupBox
                            key = {2}
                            type="Picker"
                            title="Ng??y L???p"
                            onChange={onDateChange}
                            value = {date}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <GroupBox
                            key = {3}
                            type="Label"
                            title="Ng?????i L???p"
                            value = {userInfo.TenNguoiDung}
                            disabled="disabled"
                        />
                    </td>
                    <td>
                        <GroupBox
                            key = {4}
                            type="Number"
                            title="T???ng Ti???n"
                            value={total.toLocaleString("it-IT")}
                            onChange={onTotalChange}
                            error={totalError}
                            validationTip= "T???ng Ti???n ph???i l???n h??n 0"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <GroupBox
                            key = {5}
                            type="TextBox"
                            title="Ghi Ch??"
                            onChange={onNoteChange}
                            value = {note}
                        />
                    </td>
                </tr>
            </table>
            <br />

            <div style={{textAlign: "center"}}>
                <Button size="large" variant="contained" color="primary" onClick = {() => handleSubmitClick()}>
                    Thanh To??n
                </Button>
            </div>
        </div>
    )
}

export default XacNhanThanhToan
