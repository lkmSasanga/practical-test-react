import React, { useEffect, useState } from "react";

import classes from "./drawer.module.css";
import store from "../../redux/store";
import axios from "axios";
import DrawerCard from "./drawerCard/drawerCard";
import "font-awesome/css/font-awesome.min.css";

const Drawer = props => {
  const [shipmentDetails, setShipmentDetails] = useState("");

  useEffect(() => {
    console.log("drwaer opned");

    let storeArr = store.getState().items;
    console.log("from cart", storeArr);
    setShipmentDetails(storeArr);
  }, []);
  return (
    <div className={classes.bagContainer}>
      <div className={classes.bagTitleContainer}>
        {/* <div>
          <p className={classes.cartIcon}>
            <i className="fa fa-cart-plus fa-2x" />
          </p>
          <p className={classes.count}>{store.getState().items.length}</p>
        </div> */}

        <h2 className={classes.bag}><i className="fa fa-cart-plus fa-lg" /> &nbsp; Bag</h2>
        <p className={classes.count}>{store.getState().items.length}</p>
     
      </div>

      <div>
        {shipmentDetails && (
          <div className={classes.mainContainer}>
            {shipmentDetails.map(shipment => (
              <div key={shipment.id} className={classes.Container}>
                <DrawerCard key={shipment.id}>
                  {/* {shipment.details.tag ? (
                    <p className={classes.tag}>{shipment.details.tag}</p>
                  ) : null} */}
                  <img
                    className={classes.image}
                    src={shipment.details.image}
                    alt="t-shirt"
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className={classes.name}>{shipment.name}</p>
                    <p className={classes.type}>{shipment.details.type}</p>
                    <p className={classes.type}>Quantity 02</p>
                  </div>
                  <p className={classes.price}>$ {shipment.details.price}</p>

                  {/* <p className={classes.size}>{shipment.details.size}</p> */}

                  {/* <button
                  className={classes.button}
                //   onClick={e => addToCart(shipment)}
                >
                  Add to cart
                </button> */}
                </DrawerCard>
              </div>
            ))}
          </div>
        )}
      </div>
      {store.getState().items.length !== 0 && (
        <button className={classes.button}>Checkout</button>
      )}
    </div>
  );
};

export default Drawer;
