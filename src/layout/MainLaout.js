// import styles from "./MainLayout.module.css";
import React, { useEffect, useState } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
import Card from "../components/ItemCard/ItemCard";
import axios from "axios";

function MainLayout() {
  const [shipmentDetails, setShipmentDetails] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [itemSize, setItemSize] = useState("");

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
  };

  const filterItems = size => {
    // setItemSize(size);
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
    for (let i = 0; i < shipmentDetails.length; i++) {
      if (size === shipmentDetails[i].details.size) {
        console.log("filtered item", shipmentDetails[i]);
        let detailsArr = [];
        detailsArr.push(shipmentDetails[i]);
        setShipmentDetails(detailsArr);
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Sizes</h1>
        <button onClick={e => filterItems("XS")}>XS</button>
        <button onClick={e => filterItems("S")}>S</button>
        <button onClick={e => filterItems("M")}>M</button>
        <button onClick={e => filterItems("ML")}>ML</button>
        <button onClick={e => filterItems("L")}>L</button>
        <button onClick={e => filterItems("XL")}>XL</button>
        <button onClick={e => filterItems("XXL")}>XXL</button>
      </div>
      {shipmentDetails && (
        <div>
          {shipmentDetails.map(shipment => (
            <div>
              <Card key={shipment._id}>
                <p>{shipment.details.tag}</p>
                <img src={shipment.details.image} alt="t-shirt" />
                <p>{shipment.name}</p>
                <p>{shipment.details.price}</p>
                <p>{shipment.details.size}</p>

                <button onClick={e => addToCart(shipment)}>Add to cart</button>
              </Card>
            </div>
          ))}
        </div>
      )}

      {showSpinner && <Spinner />}
    </div>
  );
}

export default MainLayout;
