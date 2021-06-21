import React, { useEffect, useRef, useState } from "react";
import "../../../components/App/App.css";
import Newsletter from "../../../components/Newsletter.js";
import Footer from "../../../components/Footer/Footer.js";
import ProductBody from "./ProductBody.js";
import HeaderV2 from "../../../components/Header/HeaderV2";
import ProductRecommend from "./ProductRecommend.js";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiayByID } from "../../../redux/actions/giayAction";

function ProductDetail(props) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [tabId, setTabId] = useState(0);
  const bRef = useRef(null);

  const sanpham = useSelector((state) => state.Giay);

  const { loading: productLoading, error: giayError, giay } = sanpham;

  const handleClick = () => {
    smoothScroll.scrollTo("review");
    setTabId(1);
  };
  var smoothScroll = {
    timer: null,

    stop: function () {
      clearTimeout(this.timer);
    },

    scrollTo: function (id, callback) {
      var settings = {
        duration: 1000,
        easing: {
          outQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
          },
        },
      };
      var percentage;
      var startTime;
      var node = document.getElementById(id);
      var nodeTop = node.offsetTop;
      var nodeHeight = node.offsetHeight;
      var body = document.body;
      var html = document.documentElement;
      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      var windowHeight = window.innerHeight;
      var offset = window.pageYOffset;
      var delta = nodeTop - offset;
      var bottomScrollableY = height - windowHeight;
      var targetY =
        bottomScrollableY < delta
          ? bottomScrollableY - (height - nodeTop - nodeHeight + offset)
          : delta - 30;

      startTime = Date.now();
      percentage = 0;

      if (this.timer) {
        clearInterval(this.timer);
      }

      function step() {
        var yScroll;
        var elapsed = Date.now() - startTime;

        if (elapsed > settings.duration) {
          clearTimeout(this.timer);
        }

        percentage = elapsed / settings.duration;

        if (percentage > 1) {
          clearTimeout(this.timer);

          if (callback) {
            callback();
          }
        } else {
          yScroll = settings.easing.outQuint(
            0,
            elapsed,
            offset,
            targetY,
            settings.duration
          );
          window.scrollTo(0, yScroll);
          this.timer = setTimeout(step, 10);
        }
      }

      this.timer = setTimeout(step, 10);
    },
  };
  const setTab = (tab) => {
    setTabId(tab);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
    // axios
    //   .get(`http://pe.heromc.net:4000/products/` + props.match.params.id)
    //   .then((res) => {
    //     setProduct(res.data);
    //   });
    const id = props.match.params.id;
    const fetchData = async () => {
      await dispatch(fetchGiayByID(id));
    };
    if (typeof productLoading === "undefined") fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    setProduct(giay);
  }, [giay]);
  return (
    <div className="ProductDetail">
      <HeaderV2 />
      <ProductBody product={product} scrollOnLick={handleClick} />
      {/* <ProductReview
        product={product}
        bRef={bRef}
        tabId={tabId}
        setTab={setTab}
        id={"review"}
      /> */}
      <ProductRecommend product={product} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default withRouter(ProductDetail);
