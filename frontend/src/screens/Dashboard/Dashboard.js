import React, { useEffect, useState } from "react";
import "../../components/App/App.css";
import "../../styles/dashboard.css";
import {
  faFileInvoice,
  faMoneyBillWave,
  faTasks,
  faShoePrints,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import DashboardTotalCount from "./DashboardTotalCount";
import DashboardTodoList from "./DashboardTodoList";
import DashboardTopFive from "./DashboardTopFive";
import { fetchListGiay } from "../../redux/actions/giayAction";
import { fetchListPhieuBanHang } from "../../redux/actions/phieuBanHangAction";
import { fetchListKhachHang } from "../../redux/actions/nguoiDungAction";

//import DashboardChart from './DashboardChart'

//import DashboardChartPie from './DashboardChartPie'
import DashboardChartLine from "./DashboardChartLine";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [bill, setBill] = useState([]);
  const [payment, setPayment] = useState([]);
  const [user, setUser] = useState([]);
  const [topProductSales, setTopProductSales] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [orderMonthPercent, setOrderMonthPercent] = useState({});
  const [saleMonthPercent, setSaleMonthPercent] = useState({});
  const [incomeMonthPercent, setIncomeMonthPercent] = useState({});

  const { listGioHang } = useSelector((state) => state.ListGioHang);
  const { listKhachHang } = useSelector((state) => state.ListKhachHang);
  const { listPhieuBanHang } = useSelector((state) => state.ListPhieuBanHang);
  const { listGiay } = useSelector((state) => state.ListGiay);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListKhachHang());
      await dispatch(fetchListPhieuBanHang());
      await dispatch(fetchListGiay());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = Object.values(listKhachHang).reduce((result, value) => {
      result.push({
        ...value,
      });
      return result;
    }, []);
    setUser(data);
  }, [listKhachHang]);

  useEffect(() => {
    var total = 0;
    const data = Object.values(listPhieuBanHang).reduce((result, value) => {
      result.push({
        ...value,
      });
      total += Number(value.TongTien);
      return result;
    }, []);
    setBill(data);
    setTotalIncome(total);
  }, [listPhieuBanHang]);

  useEffect(() => {
    var total = 0;
    const data = Object.values(listGiay).reduce((result, value) => {
      result.push({
        ...value,
      });
      total += Number(value.DaBan);
      return result;
    }, []);
    setTotalSale(total);
    data.sort((a, b) => b.DaBan - a.DaBan);
    setTopProductSales(data.slice(0, 5));
  }, [listGiay]);

  const totalCount = [
    {
      id: 1,
      title: "Số hóa đơn",
      count: bill.length,
      percent: orderMonthPercent.percent,
      isDecrease: orderMonthPercent.isDecrease,
      color: "orange",
      icon: faFileInvoice,
    },
    {
      id: 2,
      title: "Số sản phẩm bán ra",
      count: `${totalSale}`,
      percent: saleMonthPercent.percent,
      isDecrease: saleMonthPercent.isDecrease,
      color: "pink",
      icon: faShoePrints,
    },
    {
      id: 3,
      title: "Doanh thu",
      count: `${totalIncome
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`,
      percent: incomeMonthPercent.percent,
      isDecrease: incomeMonthPercent.isDecrease,
      color: "green",
      icon: faMoneyBillWave,
    },
    {
      id: 4,
      title: "Số người dùng",
      count: user.length,
      percent: 20,
      isDecrease: true,
      color: "lightblue",
      icon: faUser,
    },
  ];

  return (
    <div className="dashboard-main">
      <div className="row flex">
        {totalCount.map((item, index) => {
          return <DashboardTotalCount key={index} item={item} />;
        })}
      </div>
      {/* <DashboardLocation
                order={order}
            /> */}
      <div className="row flex">
        <DashboardTopFive
          icon={faShoePrints}
          title="Sản phẩm bán chạy"
          color="pink"
          data={topProductSales}
          table={[
            {
              title: "Tên sản phẩm",
            },
            {
              title: "Đã bán",
            },
          ]}
        />
        <DashboardTodoList // recent orders
          icon={faTasks}
          title="Todo list"
          color="green"
        />
      </div>
      <div className="row flex">
        {/* <DashboardChartPie
                    email = {email}
                    color = "pink"
                />
                <DashboardChart
                    products = {products}
                    order = {order}
                    color = "lightblue"
                /> */}
      </div>
      <div className="row flex">
        <DashboardChartLine icon={faTasks} order={bill} color="pink" />
      </div>
    </div>
  );
};

export default Dashboard;
