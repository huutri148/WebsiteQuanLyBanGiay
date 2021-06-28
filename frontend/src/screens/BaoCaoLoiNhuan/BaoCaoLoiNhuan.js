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
import { fetchListPhieuBanHang } from "../../redux/actions/phieuBanHangAction";
import { fetchListPhieuChi } from "../../redux/actions/phieuChiAction";

//import DashboardChart from './DashboardChart'

//import DashboardChartPie from './DashboardChartPie'
import DashboardChartLine from "./DashboardChartLine";

const BaoCaoLoiNhuan = () => {
  const dispatch = useDispatch();
  const [bill, setBill] = useState([]);
  const [payment, setPayment] = useState([]);

  const { listPhieuBanHang } = useSelector((state) => state.ListPhieuBanHang);
  const paymentList = useSelector((state) => state.ListPhieuChi);
  const { listPhieuChi } = paymentList;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListPhieuBanHang());
      await dispatch(fetchListPhieuChi());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = Object.values(listPhieuBanHang).reduce((result, value) => {
      result.push({
        ...value,
      });
      return result;
    }, []);
    setBill(data);
  }, [listPhieuBanHang]);

  useEffect(() => {
    const data = Object.values(listPhieuChi).reduce((result, value) => {
      result.push({
        ...value,
      });

      return result;
    }, []);
    setPayment(data);
  }, [listPhieuChi]);

  return (
    <div className="dashboard-main">
      <div className="row flex">
        <DashboardChartLine
          icon={faTasks}
          order={bill}
          color="pink"
          payment={payment}
        />
      </div>
    </div>
  );
};

export default BaoCaoLoiNhuan;
