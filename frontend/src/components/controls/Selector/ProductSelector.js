import React, { useState } from "react";
import Select from "react-select";

export default function ProductSelector(props) {
  const [selectedValue, setSelectedValue] = useState(0);
  const handleChange = (e) => {
    setSelectedValue(e.value);
    sendData(e);
  };
  const sendData = (e)=> {
    props.setSelectedId(e.value);
  }
  const options = props.products.map((item) => {
    let newObj = {};
    newObj.value = item.MaGiay;
    newObj.label =
      item.TenGiay +
      "-" +
      item.TenMau +
      "-" +
      item.GioiTinh +
      "-" +
      item.DonGia +
      "-" +
      item.TongSoLuong;
    newObj.Anh = item.Anh;
    return newObj;
  });
  const formatOptionLabel = ({ value, label, Anh }) => {
    const record = label.split("-");
    return (
      <div style={{ display: "flex" }}>
        <img
          width="30"
          height="30"
          src={Anh}
          alt={value}
          style={{ marginRight: 10, objectFit: "scale-down" }}
        />
        <label style={{ marginRight: 10, fontWeight: "bold" }}>
          Mã: {value}
        </label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>-</label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>
          Tên: {record[0]}
        </label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>-</label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>
          Màu: {record[1]}
        </label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>-</label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>
          Giới Tính: {record[2]}
        </label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>-</label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>
          Giá: {record[3]}
        </label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>-</label>
        <label style={{ marginRight: 10, fontWeight: "bold" }}>
          Số Lượng: {record[4]}
        </label>
      </div>
    );
  };
  const styles = {
    control: (base) => ({
      ...base,
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
    }),
  };
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
      <Select
        placeholder = "Hàng Hoá ..."
        value={options.find((obj) => obj.value === selectedValue)}
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        options={options}
        getOptionLabel={(option) => `${option.value} : ${option.label}`}
        styles={styles}
      />
    </div>
  );
}
