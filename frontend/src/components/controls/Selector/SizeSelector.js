import { makeStyles } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiaySize } from "../../../redux/actions/giayAction";
import "./Selector.css";

export default function SizeSelector(props) {
  const [selectedValue, setSelectedValue] = useState(1);
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    sendData(e.target.value);
  };
  const sendData = (index) => {
    if (giaySize !== undefined)
      if (giaySize[index] !== undefined)
        if (giaySize[index].SoLuong !== undefined && giaySize[index].MaGiay === item.MaGiay) 
          props.onSizeChange(giaySize[index].SoLuong, index - 1 ,giaySize[index].MaChiTietGiay);
  };
  // Props in component
  const {item, ListSize } = props;
  const [listAvailableSize, setListAvailableSize] = useState(ListSize);
  const [loading, setLoading] = useState();
  // Fetch API
  const dispatch = useDispatch();
  const listSize = useSelector((state) => state.SizeGiay);
  const { loading: sizeLoading, error: sizeError, giaySize } = listSize;
  useEffect(() => {
    setSelectedValue(0);
    var tmp = [];
    ListSize.forEach(element => {
      if (giaySize[element.MaSize] !== undefined)
          if (giaySize[element.MaSize].SoLuong !== undefined)
            if(giaySize[element.MaSize].SoLuong > 0)
              {
                if(tmp.length == 0)
                  sendData(element.MaSize);
                tmp.push(element);
              }
      });
    setListAvailableSize(tmp);
  }, [loading]);
  // Fetch data from API
  useEffect(() => {
    const fetchData = async (id) => {
    await dispatch(fetchGiaySize(id));
    setLoading(!loading);
    };
    fetchData(item.MaGiay);
  }, [dispatch, item]);
  return (
    <div style={{ padding: "0px 10px", display: "block" }}>
      <label
        style={{
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {props.title}
      </label>
      <select value={selectedValue} onChange={(e) => handleChange(e)}>
        {listAvailableSize.map((item) => (
          <option key = {item.MaSize} value={item.MaSize}>{item.TenSize}</option>
        ))}
      </select>
    </div>
  );
}
