import React, { useEffect, useState } from "react";

import classes from "./drawer.module.css";
import store from "../../redux/store";
import axios from "axios";
import DrawerCard from "./drawerCard/drawerCard";

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

  }, []);
  return (
    <div className={classes.bagContainer}>
      <h2>Bag</h2>
      <div>
      {shipmentDetails && (
        <div className={classes.mainContainer}>
          {shipmentDetails.map(shipment => (
            <div className={classes.Container}>
              <DrawerCard key={shipment._id}>
                {shipment.details.tag ? (
                  <p className={classes.tag}>{shipment.details.tag}</p>
                ) : null}
                <img
                  className={classes.image}
                  src={shipment.details.image}
                  alt="t-shirt"
                />
                <p className={classes.name}>{shipment.name}</p>
                <p className={classes.price}>{shipment.details.price}</p>
                <p className={classes.size}>{shipment.details.size}</p>

                <button
                  className={classes.button}
                //   onClick={e => addToCart(shipment)}
                >
                  Add to cart
                </button>
              </DrawerCard>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Drawer;
