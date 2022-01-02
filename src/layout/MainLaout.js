import React, { useEffect, useState } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
import Card from "../components/ItemCard/ItemCard";
import axios from "axios";
import classes from "./MainLayout.module.css";
import store from "../redux/store";
import Drawer from "../components/drawer/drawer";
import "font-awesome/css/font-awesome.min.css";

function MainLayout() {
  const [shipmentDetails, setShipmentDetails] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [count, setCount] = useState("0");

  useEffect(() => {
    setShowSpinner(true);

    axios
      .get(
        "https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments"
      )
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200) {
          console.log("success");
          setShowSpinner(false);
          setShipmentDetails(response.data);
        }
      });
  }, []);

  const addToCart = shipment => {
    console.log("add to cart", shipment);
    store.dispatch({ type: "cart/add", payload: shipment });

    setCount(store.getState().items.length);
  };

  const filterItems = size => {
    setShowSpinner(true);
    setNotFound(false);
    setFilter(true);

    if (size === "XS") {
      let expandedSize = "xsmall";

      findItem(expandedSize);
    } else if (size === "S") {
      let expandedSize = "small";

      findItem(expandedSize);
    } else if (size === "M") {
      let expandedSize = "medium";

      for (let i = 0; i < shipmentDetails.length; i++) {
        if (expandedSize === shipmentDetails[i].details.size) {
          console.log("filtered item", shipmentDetails[i]);
          let detailsArr = [];
          detailsArr.push(shipmentDetails[i]);
          setShipmentDetails(detailsArr);
        }
      }
    } else if (size === "ML") {
      let expandedSize = "medium inseam length";
      findItem(expandedSize);
    } else if (size === "L") {
      let expandedSize = "large";
      findItem(expandedSize);
    } else if (size === "XL") {
      let expandedSize = "xlarge";

      findItem(expandedSize);
    } else if (size === "XXL") {
      let expandedSize = "xxlarge";
      findItem(expandedSize);
    }
  };

  const findItem = size => {
    setShipmentDetails([]);

    let detailsArr = [];

    axios
      .get(
        "https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments"
      )
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          console.log("success");
          setShowSpinner(false);
          setShipmentDetails(response.data);
          // detailsArr.push({});
        }
      })
      .then(() => {
        for (let i = 0; i < shipmentDetails.length; i++) {
          if (size === shipmentDetails[i].details.size) {
            console.log("filtered item", shipmentDetails[i]);
            detailsArr.push(shipmentDetails[i]);
            setShipmentDetails(detailsArr);
          }
        }

        if (detailsArr.length === 0) {
          console.log(detailsArr.length);
          console.log("not found ");
          setNotFound(true);
        }
        detailsArr.push();
        setFilter(false);
        setShowSpinner(false);
      });
  };

  const onClickCartHandler = () => {
    console.log("cart clicked");

    setShowDrawer(!showDrawer);
    // setCartClicked(true);
  };

  return (
    <div>
      {!showSpinner ? (
        <div className={classes.page}>
          <div className={classes.filterContainer}>
            <h1>Sizes:</h1>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("XS")}
            >
              XS
            </button>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("S")}
            >
              S
            </button>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("M")}
            >
              M
            </button>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("ML")}
            >
              ML
            </button>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("L")}
            >
              L
            </button>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("XL")}
            >
              XL
            </button>
            <button
              className={classes.filterBtn}
              onClick={e => filterItems("XXL")}
            >
              XXL
            </button>
          </div>
          {notFound ? (
            <p className={classes.notFound}>NOT FOUND YOUR SIZE</p>
          ) : null}
          {shipmentDetails && (
            <div className={classes.mainContainer}>
              {shipmentDetails.map(shipment => (
                <div key={shipment.id} className={classes.Container}>
                  <Card key={shipment.id}>
                    {shipment.details.tag ? (
                      <p className={classes.tag}>{shipment.details.tag}</p>
                    ) : null}
                    <img
                      className={classes.image}
                      src={shipment.details.image}
                      alt="t-shirt"
                    />
                    <p className={classes.name}>{shipment.name}</p>
                    <div className={classes.line}>{/* <hr/> */}</div>
                    <p className={classes.price}>$ {shipment.details.price}</p>
                    <p className={classes.size}>{shipment.details.size}</p>

                    <button
                      className={classes.button}
                      onClick={e => addToCart(shipment)}
                    >
                      Add to cart
                    </button>
                  </Card>
                </div>
              ))}
            </div>
          )}

          <div className={classes.cart} onClick={e => onClickCartHandler()}>
            {!showDrawer ? (
              <div>
                <p className={classes.cartIcon}>
                  <i className="fa fa-cart-plus fa-2x" />
                </p>
                <p className={classes.count}>{count}</p>
              </div>
            ) : (
              <div>
                <p className={classes.closeIcon}>
                  <i className="fa fa-times fa-2x" />
                </p>
              </div>
            )}
          </div>

          {showDrawer ? (
            <div className={classes.drawerContainer}>
              <Drawer />
            </div>
          ) : null}
        </div>
      ) : (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default MainLayout;
