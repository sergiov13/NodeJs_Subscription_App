import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const content = {
    inputs: [
      {
        label: "Customer Id",
        name: "customerId",
        type: "text",
        placeholder: ""
      },
      {
        label: "Product Name",
        name: "productName",
        type: "text",
        placeholder: ""
      },
      {
        label: "Domain",
        name: "domain",
        type: "text",
        placeholder: ""
      },
      {
        label: "Duration in Months",
        name: "durationMonths",
        type: "number",
        placeholder: ""
      },
      {
        label: "Start Date",
        name: "startDate",
        type: "date",
        placeholder: ""
      },
    ],
  };
  

export default function SubscriptionEditDel(props) {
  const [ subscription, setSubscription] = useState([]);
  const [ loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm({ shouldFocusError: true, defaultValues: {}, });
  let history = useHistory();

  useEffect(() => {
        if(props.match.params.id != null) {
        axios.get('http://localhost:8000/subscription/'+ props.match.params.id)
        .then( res => {
            setSubscription(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

}, [])

  const onSubmit = (data) => {
    axios.post('http://localhost:8000/subscription/update/'+data._id, data)
    .then( res => console.log(res.data))
    .catch( err => console.log("Bad" + err))
    history.push('/');
    alert('Subscription Updated' + data);
  };

  const popInput = () => {
   

  
    return( content.inputs.map((input, index) => (
        
        <div key={index}>
          <p>
            <label>{input.label}</label>
          </p>
          <p>
            <input 
                name={input.name}  
                type={input.type} 
                placeholder={input.name === 'startDate' ? subscription[input.name].substring(0, 10) : subscription[input.name] }
                {...register(input.name, { required: true })}/>
          </p>
        </div>
    )));
   } 


  return (
    <>
       {console.log('Rendering')}
      <form onSubmit={handleSubmit(onSubmit)}>
      {loading ? "loading..." : popInput()}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
