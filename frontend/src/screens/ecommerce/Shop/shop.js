import React, { useEffect, useState } from "react";
import "../../../components/App/App.css";
import Newsletter from "../../../components/Newsletter.js";
import Footer from "../../../components/Footer/Footer.js";
import BannerV2 from "../../../components/Banner/BannerV2.js";
import Header from "../../../components/Header/Header.js";
import ShopBody from "./shopBody";
import bg from "../../../assets/jordan-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchListGiay } from "../../../redux/actions/giayAction";
import { withRouter } from "react-router-dom";
import { fetchListSize } from "../../../redux/actions/sizeAction";

const Shop = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sortedCate, setSortedCate] = useState([]);
  let sex = props.location.pathname.split("/")[1];
  let cate = props.location.pathname.split("/")[2];
  const productList = useSelector((state) => state.ListGiay);
  const { loading: productLoading, listGiay } = productList;
  const { loading } = useSelector((state) => state.ListSize);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  useEffect(() => {
    if (sex === "shop") {
      //     axios.get(`http://pe.heromc.net:4000/products`)
      //     .then(res => {
      //         const virtualCate = [...res.data]
      //         //Get all category
      //         const sortedcate = Object.values(virtualCate.reduce((a, {productCate}) => {
      //             a[productCate] = a[productCate] || {productCate, count: 0};
      //             a[productCate].count++;
      //             return a;
      //         }, Object.create(null)));
      //         //Sort and splice category by posts count
      //         sortedcate.sort((a,b) =>  b.count - a.count)
      //         setSortedCate(sortedcate)
      //         const virtualData = []
      //         for(let i in res.data) {
      //             if (cate) {
      //                 if ((res.data[i].productName).toLowerCase().includes(cate.toLowerCase())) {
      //                     virtualData.push(res.data[i])
      //                 }
      //             } else {
      //                 virtualData.push(res.data[i])
      //             }
      //         }
      //         setProducts(virtualData)
      //     })
    } else {
      //     sex.toLowerCase() === "men" ? sex = "man" : sex = "woman"
      //     axios.get(`http://pe.heromc.net:4000/products`)
      //         .then(res => {
      //             const virtualCate = []
      //             for (let i in res.data) {
      //                 if (sex === "woman") {
      //                     if (res.data[i].productSex === "Woman") {
      //                         virtualCate.push(res.data[i])
      //                     }
      //                 } else {
      //                     if (res.data[i].productSex === "Man") {
      //                         virtualCate.push(res.data[i])
      //                     }
      //                 }
      //             }
      //             //Get all category
      //             const sortedcate = Object.values(virtualCate.reduce((a, {productCate}) => {
      //                 a[productCate] = a[productCate] || {productCate, count: 0};
      //                 a[productCate].count++;
      //                 return a;
      //             }, Object.create(null)));
      //             //Sort and splice category by posts count
      //             sortedcate.sort((a,b) =>  b.count - a.count)
      //             setSortedCate(sortedcate)
      //             const virtualData = []
      //             for(let i in res.data) {
      //                 if (!cate) {
      //                     if (res.data[i].productSex.toLowerCase() === sex) {
      //                         virtualData.push(res.data[i])
      //                     }
      //                 } else {
      //                     if (res.data[i].productSex.toLowerCase() === sex && cate && res.data[i].productGroupCate.toLowerCase().split(' ').join('-') === cate) {
      //                         virtualData.push(res.data[i])
      //                     } else if (res.data[i].productSex.toLowerCase() === sex && cate && res.data[i].productCate.toLowerCase().split(' ').join('-') === cate) {
      //                         virtualData.push(res.data[i])
      //                     }
      //                 }
      //             }
      //             setProducts(virtualData)
      //         }
      //     )
    }
    const fetchData = async () => {
      await dispatch(fetchListGiay());
    };
    const fetchSizeData = async () => {
      await dispatch(fetchListSize());
    };
    if (typeof productLoading === "undefined") fetchData();
    if (typeof productLoading === "undefined") fetchSizeData();
  }, []);

  useEffect(() => {
    const data = Object.values(listGiay).reduce((result, value) => {
      result.push({
        ...value,
      });
      return result;
    }, []);
    setProducts(data);
  }, [listGiay]);

  return (
    <div className="Men">
      <Header />
      <BannerV2 bannerImage={bg} position={"120px"} />
      <ShopBody products={products} sortedCate={sortedCate} />
      <Newsletter />
      <Footer />
    </div>
  );
};
export default withRouter(Shop);
