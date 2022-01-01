import React, { useEffect, useState } from "react";

import classes from "./drawer.module.css";
import store from "../../redux/store";
import axios from "axios";

const Drawer = props => {
  const [shipmentDetails, setShipmentDetails] = useState("");

  useEffect(() => {
    console.log("drwaer opned");

    let storeArr = store.getState().items;
    console.log("from cart", storeArr);

    if (storeArr.length !== 0) {
      axios
        .get(
          "https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments"
        )
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
            console.log("success");
            setShipmentDetails(response.data);
          }
        });
    }

    // return () => {
    // }
  }, []);
  return (
    <div className={classes.bagContainer}>
      <h2>Bag</h2>
      <div>
        <p>cart oitems</p>
      </div>
    </div>
  );
};

export default Drawer;
