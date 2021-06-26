import React, { useEffect, useState } from "react";
import "../App/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCheckCircle,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Search(props) {
  const [products, setProducts] = useState([]);
  const [constProducts, setConstProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toast, setToast] = useState(false);

  const { listGiay } = useSelector((state) => state.ListGiay);

  useEffect(() => {
    const data = Object.values(listGiay).reduce((result, value) => {
      result.push({
        ...value,
      });
      return result;
    }, []);
    setProducts(data);
    setConstProducts(data);
  }, [listGiay]);

  const search = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    const search = [];
    for (let i in constProducts) {
      if (constProducts[i].TenGiay.toLowerCase().includes(searchInput)) {
        search.push(constProducts[i]);
      }
    }
    setProducts(search);
  };

  const cartClick = (event) => {};

  return (
    <div
      className={props.searchOpen === false ? "Search displayNone" : "Search"}
    >
      <div className="search-header flex">
        <div className="search-title">Search</div>
        <div className="search-close" onClick={props.clickToClose}>
          <FontAwesomeIcon icon={faTimes} className="icon" />
        </div>
      </div>
      <div className={props.searchOpen === false ? "" : "fadeIn"}>
        <div className="search-form">
          <form className="flex">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input placeholder="Search" onChange={search} value={searchInput} />
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </form>
        </div>
        {products.length > 0 &&
          searchInput !== "" &&
          products.map((item, index) => {
            return (
              <div className="cart-item flex" key={index}>
                <div className="cart-product-img">
                  <img src={item.Anh} width="80px" height="100%" alt=""></img>
                </div>
                <div className="cart-product-mobile flex">
                  <div
                    className="cart-product-name flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.TenGiay}
                  </div>
                  <div
                    className="cart-product-price wl-mb-price flex"
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.DonGiaBan.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      "."
                    )}{" "}
                    đ
                  </div>

                  <div
                    className="product-info-addtocart wl-mb-addtocart flex-center btn"
                    onClick={(event) => {
                      cartClick(event);
                      //removeFromWishList(event)
                    }}
                    id={item.MaGiay}
                  >
                    <FontAwesomeIcon
                      style={{ pointerEvents: "none" }}
                      icon={faCartPlus}
                    />
                    <p style={{ pointerEvents: "none" }}>Add to cart</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
