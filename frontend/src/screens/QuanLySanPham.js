import { CssBaseline, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { React, useState } from "react";
import DanhSachSanPham from "./QuanLySanPham/DanhSachSanPham";
function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;
  return (
    <div className={classes.tab} {...other}>
      {value === index && <div p={3}>{children}</div>}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    flexGrow: "1",
  },
  paper: {
    margin: theme.spacing(0, 4),
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80vh",
  },
  tab: {
    margin: theme.spacing(0, 2),
    display: "block",
    float: "left",
    width: "100%",
  },
  tabPaper: {
    margin: theme.spacing(0, 6),
    padding: theme.spacing(0, 6),
    display: "inline-block",
    float: "left",
  },
}));

const QuanLySanPham = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Quản lý" />
          <Tab label="Thêm" />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <DanhSachSanPham className={classes.tabPaper} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Thêm sản phẩm mới
      </TabPanel>
      <TabPanel value={value} index={2}>
        Sửa sản phẩm
      </TabPanel>
    </div>
  );
};

export default QuanLySanPham;
