// import styles from "./MainLayout.module.css";
import React, { useEffect, useState } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
import Card from "../components/ItemCard/ItemCard";
import axios from "axios";

function MainLayout() {
  const [shipmentDetails, setShipmentDetails] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

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
  return (
    <div>
      {shipmentDetails && (
        <div>
          {shipmentDetails.map(shipment => (
            <div>
              <Card key={shipment._id}>
                <div>
                  <p>{shipment.name}</p>
                </div>
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
