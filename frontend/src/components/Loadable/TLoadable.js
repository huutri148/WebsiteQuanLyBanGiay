import React from "react";
import Loadable from "react-loadable";
import Loading from "./Loading";

const TLoadable = (opts) => {
  return Loadable(
    Object.assign(
      {
        loading: Loading,
        delay: 100,
        timeout: 10000,
      },
      opts
    )
  );
};

export default TLoadable;
