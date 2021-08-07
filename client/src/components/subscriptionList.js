import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function SubscriptionList() {
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    console.log("something should be happening");
    axios
      .get("http://localhost:8000/subscription/")
      .then((res) => {
        setSubscription(res.data);
        console.table(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteSubscription = (id) => {
    axios
      .delete("http://localhost:8000/subscription/" + id)
      .then((res) => console.log(res.data));

    setSubscription((prev) => prev.filter((el) => el._id !== id));
  };

  const subscriptionList = () => {
    console.log("THIS ARE THE " + subscription);
    return subscription.map((currentSubs, index) => (
      <tr key={index + "_tr"}>
        <td key={index + "_CustId"}>{currentSubs.customerId}</td>
        <td key={index + "_prodName"}>{currentSubs.productName}</td>
        <td key={index + "_dom"}>{currentSubs.domain}</td>
        <td key={index + "_date"}>{currentSubs.startDate.substring(0, 10)}</td>
        <td key={index + "_duration"}>{currentSubs.durationMonths}</td>
        <td key={index + "_id"}>
          <Link text-decoration="none" to={"/edit/" + currentSubs._id}>
            <Button variant="secondary">Edit</Button>
          </Link>
          {"  "}
          <Button
            variant="danger"
            onClick={() => {
              deleteSubscription(currentSubs._id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Subscriptions</h2>
      <Table>
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Product Name</th>
            <th>Domain</th>
            <th>Start Date</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{subscriptionList()}</tbody>
      </Table>
    </div>
  );
}
