import React, { useEffect, useState } from "react";
import "../../../components/App/App.css";
import Product from "../Product/Product.js";
import { fetchListGiay } from "../../../redux/actions/giayAction";
import { useSelector, useDispatch } from "react-redux";
export default function ProductRecommend(props) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { listGiay } = useSelector((state) => state.ListGiay);
  let productInfo = [];
  if (props.product) {
    productInfo = props.product;
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListGiay());
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (listGiay != undefined) {
      const data = Object.values(listGiay).reduce((result, value) => {
        result.push({
          ...value,
        });
        return result;
      }, []);
      setProducts(data);
    }
  }, [listGiay]);
  const recommendProducts = [];
  products.filter((item) => {
    if (item.MaGiay !== productInfo.MaGiay) {
      if (item.GioiTinh === productInfo.GioiTinh) {
        recommendProducts.push(item);
      }
    }
    return null;
  });

  let recommendProducts2 = recommendProducts.filter(function (
    elem,
    index,
    self
  ) {
    return index === self.indexOf(elem);
  });

  return (
    <div className="ProductRecommend">
      <div className="newsletter-container flex-center">
        <div className="newsletter-title">Related products</div>
        <div className="RecommendProduct">
          {recommendProducts2.slice(0, 5).map(function (item, index) {
            return <Product key={index} product={item} />;
          })}
        </div>
      </div>
      <div className="product-info-line"></div>
    </div>
  );
}
