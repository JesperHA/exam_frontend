import React from "react";
import './App.css';
import './style2.css';


// const arrayFunction = (props) => {

// 	let result = props[0];

// 	for(let i = 0; i < props.length; i++){
// 		result = props[0] + " "
// 	}

// }





const TruckTable = ({trucks}) => {

    console.log("Printer trucks")
    console.log(trucks)
  
    
  
    return (
      <div>
        <table className="table1" cellSpacing="15px">
          <thead>
            <tr align="left">
              <th>ID</th>
              <th>Name</th>
              <th>Capacity</th>
           
            </tr>
          </thead>

           <tbody>
            {trucks.map((trucks, index) => (
              <tr key={index} align="left">
                <td>{trucks.truckId}</td>
                <td>{trucks.name}</td>
                <td>{trucks.capacity}</td>
                
              </tr>
            ))}
          </tbody>
  
        </table>
      </div>
    )
  
  
  }

export default TruckTable;