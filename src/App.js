import "./App.css";
import React, { useEffect, useState } from "react";
import Spinner from "../src/components/UI/Spinner/Spinner";
import Card from "../src/components/ItemCard/ItemCard";
import axios from "axios";

function App() {
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
      <h1>Hello</h1>

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

export default App;
