import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Newsletter from "../../components/Newsletter";
import HomeTab from "./Home/HomeTab";
import Collection from "./Home/Collection";
import Banner from "../../components/Banner/Banner";
import RecommendBanner from "../../components/Banner/RecommendBanner";
const collections = [
  {
    _id: { $oid: "5fb671559d75ce72aca65eb1" },
    collectionItems: [
      { $oid: "5fb675ab993d7574061e67b4" },
      { $oid: "5fb675fa993d7574061e67b5" },
      { $oid: "5fb6771e993d7574061e67b7" },
      { $oid: "5fb67771993d7574061e67b8" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/7a61ca9c0b59cf6b235fd2bece406634",
    collectionName: "Woman collection",
    collectionTime: { $date: "2020-11-19T13:21:25.078+0000" },
  },
  {
    _id: { $oid: "5fb672d6993d7574061e67b3" },
    collectionItems: [
      { $oid: "5fa67192f91457b89f04451a" },
      { $oid: "5fa67181f91457b89f04450b" },
      { $oid: "5f997926624444cc7d7942b1" },
      { $oid: "5fa67125f91457b89f0444e5" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/143f6accbcdf4fae2b9e5be8d6ace91b",
    collectionName: "Man collection",
    collectionTime: { $date: "2020-11-19T13:27:49.999+0000" },
  },
  {
    _id: { $oid: "5fb67abd993d7574061e67b9" },
    collectionItems: [
      { $oid: "5fa6719cf91457b89f044521" },
      { $oid: "5fa671a6f91457b89f044529" },
      { $oid: "5fa671adf91457b89f04452d" },
      { $oid: "5fa671bef91457b89f044534" },
      { $oid: "5fa671d4f91457b89f044544" },
      { $oid: "5fa671d4f91457b89f044541" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/ba9fbcd762ed32a684f3f35abb1f338a",
    collectionName: "Summer collection",
    collectionTime: { $date: "2020-11-19T14:01:33.313+0000" },
  },
  {
    _id: { $oid: "5fb67cba993d7574061e67ba" },
    collectionItems: [
      { $oid: "5fb68030993d7574061e67bb" },
      { $oid: "5fb680b5993d7574061e67bc" },
      { $oid: "5fb68163993d7574061e67bd" },
      { $oid: "5fb68216993d7574061e67be" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/41e021ca0020b24bf5e2d5b7e4258cb4",
    collectionName: "Baguette collection",
    collectionTime: { $date: "2020-11-19T14:10:02.887+0000" },
  },
  {
    _id: { $oid: "5fb67cba993d7574061e67ba" },
    collectionItems: [
      { $oid: "5fb68030993d7574061e67bb" },
      { $oid: "5fb680b5993d7574061e67bc" },
      { $oid: "5fb68163993d7574061e67bd" },
      { $oid: "5fb68216993d7574061e67be" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/41e021ca0020b24bf5e2d5b7e4258cb4",
    collectionName: "Baguette collection",
    collectionTime: { $date: "2020-11-19T14:10:02.887+0000" },
  },
  {
    _id: { $oid: "5fb67cba993d7574061e67ba" },
    collectionItems: [
      { $oid: "5fb68030993d7574061e67bb" },
      { $oid: "5fb680b5993d7574061e67bc" },
      { $oid: "5fb68163993d7574061e67bd" },
      { $oid: "5fb68216993d7574061e67be" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/41e021ca0020b24bf5e2d5b7e4258cb4",
    collectionName: "Baguette collection",
    collectionTime: { $date: "2020-11-19T14:10:02.887+0000" },
  },
  {
    _id: { $oid: "5fb67cba993d7574061e67ba" },
    collectionItems: [
      { $oid: "5fb68030993d7574061e67bb" },
      { $oid: "5fb680b5993d7574061e67bc" },
      { $oid: "5fb68163993d7574061e67bd" },
      { $oid: "5fb68216993d7574061e67be" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/41e021ca0020b24bf5e2d5b7e4258cb4",
    collectionName: "Baguette collection",
    collectionTime: { $date: "2020-11-19T14:10:02.887+0000" },
  },
  {
    _id: { $oid: "5fb67cba993d7574061e67ba" },
    collectionItems: [
      { $oid: "5fb68030993d7574061e67bb" },
      { $oid: "5fb680b5993d7574061e67bc" },
      { $oid: "5fb68163993d7574061e67bd" },
      { $oid: "5fb68216993d7574061e67be" },
    ],
    collectionBanner:
      "http://pe.heromc.net:4000/images/41e021ca0020b24bf5e2d5b7e4258cb4",
    collectionName: "Baguette collection",
    collectionTime: { $date: "2020-11-19T14:10:02.887+0000" },
  },
];

const Home = () => {
  return (
    <div>
      <Header />
      <Banner collection={[]} />
      <RecommendBanner />
      <HomeTab />
      <Collection collection={collections} />

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
