
import { makeStyles } from "@material-ui/core";
import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiaySize } from "../../../actions/giayAction";
import Select from "react-select";
import "./Selector.css"

export default function SizeSelector (props) {
    const [selectedValue, setSelectedValue] = useState(1);
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
    sendData(e.target.value);
  };
  const sendData = (index)=> {
    if(giaySize !== undefined)
        if(giaySize[index] !== undefined)
            if(giaySize[index].SoLuong !== undefined)
                {
                    props.onSizeChange(giaySize[index].SoLuong,index - 1);
                    console.log(index);
                }
  }
    // Props in component
    const { item, ListSize } = props;
    const [loading, setLoading] = useState();
    // Fetch API
    const dispatch = useDispatch();
    const listSize = useSelector((state) => state.SizeGiay);
    const { loading: sizeLoading, error: sizeError, giaySize } = listSize;
    useEffect(() => {
    if(props.selectedSize === 0)
        sendData(1);
    else
        sendData(props.selectedSize);
    }, [loading]);
    // Fetch data from API
    useEffect(() => {
      const fetchData = async (id) => {
        await dispatch(fetchGiaySize(id));
        setLoading(!loading);
      };
      fetchData(item.MaGiay);
    }, [dispatch]);
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
          <select
            value = {selectedValue}
            onChange={(e) => handleChange(e)}>
                {ListSize.map((item) => (
                    <option value = {item.MaSize}>{item.TenSize}</option>
                ))}
          </select>
        </div>
    );
}