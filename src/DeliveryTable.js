import React from "react";
import './App.css';
import './style2.css';


// const arrayFunction = (props) => {

// 	let result = props[0];

// 	for(let i = 0; i < props.length; i++){
// 		result = props[0] + " "
// 	}

// }

const arrayFunction = (props) =>{

    let result = props[0].name;
  
    if(props.length > 1){
      for(let i = 1; i < props.length; i++){
        result = result + ", " + props[i].name
      }
    }
  
    return result;
  }
  const arrayFunctionWeight = (props) =>{

    let result = props[0].weight;
  
    if(props.length > 1){
      for(let i = 1; i < props.length; i++){
        result = result + ", " + props[i].weight
      }
    }
  
    return result;
  }
  const arrayFunctionUnits = (props) =>{

    let result = props[0].units;
  
    if(props.length > 1){
      for(let i = 1; i < props.length; i++){
        result = result + ", " + props[i].units
      }
    }
  
    return result;
  }



const DeliveryTable = ({deliveries}) => {

    console.log("Printer deliveries")
    console.log(deliveries)
  
    
  
    return (
      <div>
        <table className="table1" cellSpacing="15px">
          <thead>
            <tr align="left">
              <th>Date</th>
              <th>Departure Location</th>
              <th>Destination</th>
              <th>Truck</th>
              <th>Truck capacity</th>
              <th>Drivers</th>
              <th>Cargo</th>
              <th>Cargo Weight</th>
              <th>Cargo units</th>
            </tr>
          </thead>

           <tbody>
            {deliveries.map((deliveries, index) => (
              <tr key={index} align="left">
                <td>{deliveries.date}</td>
                <td>{deliveries.departureLocation}</td>
                <td>{deliveries.destination}</td>
                <td>{deliveries.truck.name}</td>
                <td>{deliveries.truck.capacity}</td>
                <td>{arrayFunction(deliveries.truck.drivers)}</td>
                <td>{arrayFunction(deliveries.cargo)}</td>
                <td>{arrayFunctionWeight(deliveries.cargo)}</td>
                <td>{arrayFunctionUnits(deliveries.cargo)}</td>
              </tr>
            ))}
          </tbody>
  
        </table>
      </div>
    )
  
  
  }

export default DeliveryTable;