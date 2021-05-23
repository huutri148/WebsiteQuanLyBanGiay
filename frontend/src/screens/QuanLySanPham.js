import { CssBaseline, makeStyles, Tab, Tabs } from "@material-ui/core";
import { React, useState } from "react";
import DanhSachSanPham from "./QuanLySanPham/DanhSachSanPham/DanhSachSanPham";
import ThemSanPham from "./QuanLySanPham/ThemSanPham";
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
  tabPaper: {
    display: "inline-block",
    float: "left",
  },
  tabHeader: {
    textTransform: "none",
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
          <Tab className={classes.tabHeader} label="Quản lý sản phẩm" />
          <Tab className={classes.tabHeader} label="Thêm sản phẩm" />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <DanhSachSanPham className={classes.tabPaper} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ThemSanPham />
      </TabPanel>
    </div>
  );
};

export default QuanLySanPham;
