import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

const content = {
  inputs: [
    {
      label: "Customer Id",
      name: "customerId",
      type: "text",
    },
    {
      label: "Domain",
      name: "domain",
      type: "text",
    },
    {
      label: "Duration in Months",
      name: "durationMonths",
      type: "number",
    },
    {
      label: "Start Date",
      name: "startDate",
      type: "date",
    },
  ],
};

export default function SubscriptionCreate() {
  const { register, handleSubmit } = useForm({
    shouldFocusError: true,
    defaultValues: {},
  });
  let history = useHistory();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/subscription/add", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Bad" + err));
    console.log(data);
    history.push("/");
    alert("Good job");
  };

  return (
    <>
      {console.log("Rendering")}
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, index) => {
          return (
            <div key={index}>
              <p>
                <label>{input.label}</label>
              </p>
              <p>
                <input
                  name={input.name}
                  type={input.type}
                  {...register(input.name, { required: true })}
                />
              </p>
            </div>
          );
        })}
        <p>
          <label>Product Name</label>
        </p>
        <select className='selectOp' {...register("productName")}>
          <option value="">Select...</option>
          <option value="domain">Domain</option>
          <option value="pDomain">Protected Domain</option>
          <option value="hosting">Hosting</option>
        </select>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </>
  );
}
