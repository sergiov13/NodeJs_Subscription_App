import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function SubscriptionList() {
  const [subscription, setSubscription] = useState([]); 
  const [sorted, setSorted ] = useState(false);

  useEffect(() => {
    axios
      .get("/subscription/")
      .then((res) => {
        setSubscription(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  const deleteSubscription = (id) => {
    axios
      .delete("/subscription/"+id)
      .then((res) => console.log("Deleted: " + res.data))
      .catch((err) => console.log(err));
    setSubscription((prev) => prev.filter((el) => el._id !== id));
  };

  
  const addMonths = (date, months) => {
    var d = new Date(date);
    d.setMonth(d.getMonth() +months);
    return d.toISOString().substring(0, 10)
  }
  
  const expirationWarning = (sub, days) => {
    var enddate = new Date(addMonths(sub.startDate, sub.durationMonths));      
    enddate.setDate(enddate.getDate() - days);
    return enddate.toISOString().substring(0,10);
  }

  const activationNotification = (sub, days) => {
    var startDate = new Date(sub.startDate);    
    startDate.setDate(startDate.getDate() + days);
    return startDate.toISOString().substring(0,10);
  }

  const checkEmailSchedule = (item) => {
        if (item.productName === "domain"){
            item["emailSched"] = [expirationWarning(item, 2)]
            return item;
        } 
        if (item.productName === "pDomain"){
            item["emailSched"] = [expirationWarning(item, 9),' - ', expirationWarning(item, 2)]
            return item;
        }
        if (item.productName === "hosting"){
            item["emailSched"] = [activationNotification(item, 1),' - ', expirationWarning(item, 9)] 
            return item;
        }   
    }  

    const SortSchedule = () => {
      setSubscription(prev => (prev.sort((a,b) => a.emailSched[0] - b.emailSched[0])));
      console.log(subscription);
    }
    
    function toggleSort(e) {
      e.preventDefault();
      sorted ? setSorted(false) : setSorted(true);
      SortSchedule();
    }

  const subscriptionList = () => {
    return subscription.map((currentSubs, index) => (
      <tr key={index + "_tr"}>
        <td key={index + "_CustId"}>{currentSubs.customerId}</td>
        <td key={index + "_prodName"}>{currentSubs.productName}</td>
        <td key={index + "_dom"}>{currentSubs.domain}</td>
        <td key={index + "_date"}>{currentSubs.startDate.substring(0, 10)}</td>
        <td key={index + "_duration"}>{currentSubs.durationMonths}</td>
        <td key={index + "_endDate"}>{addMonths(currentSubs.startDate,currentSubs.durationMonths)}</td>
        <td key={index + "_emailScheduled"}>
          {checkEmailSchedule(currentSubs)["emailSched"]}
          </td>
        <td key={index + "_id"}>
          <Link textDecoration="none" to={"/edit/" + currentSubs._id}>
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
            <th>End Date</th>
            <th onClick={e => toggleSort(e)}>Scheduled Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{sorted ? subscriptionList() : subscriptionList()}</tbody>
      </Table>
    </div>
  );
}
