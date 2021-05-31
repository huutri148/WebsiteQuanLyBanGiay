import { React, useState } from "react";
import {
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import { DeleteOutlined, Edit } from "@material-ui/icons";
import useTable from "../../components/useTable";

const headCells = [
  { id: "MaNhaCungCap", label: "Mã" },
  { id: "TenNhaCungCap", label: "Tên" },
  { id: "DiaChi", label: "Địa Chỉ", width: "30%" },
  { id: "SDT", label: "SDT" },
  { id: "Email", label: "Email" },
  { id: "actions" },
];
const NhaCungCapTable = (props) => {
  const { TableData, HandleDelete, HandleEdit } = props;

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(TableData, headCells, filterFn);

  return (
    <TableContainer style={{ padding: "0px 24px" }}>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, index) => (
            <TableRow
              key={item.MaNhaCungCap}
              style={
                index % 2 ? { background: "#eee" } : { background: "white" }
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
                    HandleEdit(item);
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="primary" onClick={() => HandleDelete(item)}>
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </TableContainer>
  );
};

export default NhaCungCapTable;
