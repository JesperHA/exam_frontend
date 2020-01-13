import React, { useState, useEffect} from 'react';
import DeliveryFacade from "./DeliveryFacade";
import TruckTable from './TruckTable';
import './style2.css';
import DeliveryTable from './DeliveryTable';
import facade from "./apiFacade";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";



function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = evt => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = evt => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <div>
      <div className="card">
        <div className="card-container">
          <h2>Login</h2>
          <p className="notLoggedInP">
            You need to be logged in to use the webpage
          </p>
          <form onChange={onChange}>
            <br />
            <input placeholder="Brugernavn" id="username" />
            <br />
            <input type="password" placeholder="Adgangskode" id="password" />
            <br></br>
            <button className="btn btn-warning btn-cons" onClick={performLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoggedIn({ user }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData(user).then(data => setDataFromServer(data.msg));
  }, [user]);

  return <div>{dataFromServer}</div>;
}



function App() {
  
  const [deliveries, setDeliveries] = useState([]);
  const [trucks, setTrucks] = useState([]);
  
  

  useEffect(() => {
    
    const fetcher = () => {
      DeliveryFacade.getDeliveries().then(data => setDeliveries(data));
      DeliveryFacade.getTrucks().then(data => setTrucks(data));
     
    }
    fetcher();
    const interval = setInterval(() => {
      fetcher();
      console.log("Refreshing")
    }, 3000);
    return () => {
      clearInterval(interval);
    }
  },[]);
  
  
  
  return (
    <div className="App">
      <Router >

      <div>
        <Header />
        <Route exact path="/" render={() => <Home />} />
        <Route path="/deliveries" render={() => <DeliveryTable deliveries={deliveries}/>}/>
        <Route path="/search" render={() => <SearchFunction/>}/>
        <Route path="/trucks" render={() => <TruckTable trucks={trucks}/>}/>
      </div>
      
      </Router>
    </div>
  )
}

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then(res => setLoggedIn(true));
    setUser(user);
  };
  const token = localStorage.getItem("jwtToken");

  return (
    <div>
      <h2>Welcome</h2>
      <hr />
      

      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <p className="LoggedInP">You are now logged in</p>
          <hr />
          <p>Serveren responded: </p>
          <p style={{ fontSize: "12px" }}>
            <LoggedIn user={user} />
          </p>

          {/* <p style={{fontSize: "12px"}}>Token: {token}</p> */}

          <button onClick={logout}>Log out</button>
          
        </div>

      )}
    </div>
  );
      }





const Header = () => {
  return (
    <ul className="header">
  <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
  <li><NavLink activeClassName="active" to="/deliveries">Deliveries</NavLink></li>
  <li><NavLink activeClassName="active" to="/search">Search</NavLink></li>
  <li><NavLink activeClassName="active" to="/trucks">Trucks</NavLink></li>
</ul>
  )
}




const SearchFunction = () => {
const [truckId, setTruckId] = useState("1");
const [trucks, setTrucks] = useState(["No truck searched"]);
const [date, setDate] = useState("No date");
function Search(truckId) {
DeliveryFacade.searchTrucks(truckId).then(data => setTrucks(data));
}
function SearchByDate(date) {
  DeliveryFacade.searchByDate(date).then(data => setTrucks(data));
}

  return (
    <div>
      <h2>Identification number</h2>
      <input  placeholder={"truck id"}
         onChange={event => setTruckId(event.target.valueAsNumber)} type={"number"}/>
        
        <button className={"btn btn-success"}
                        onClick={() => Search(truckId)}>Search</button><h2>Identification number</h2>
      <h2>Date</h2>
      <input  placeholder={"Date"}
         onChange={event => setDate(event.target.valueAsNumber)} type={"date"}/>
        
        <button className={"btn btn-success"}
                        onClick={() => SearchByDate(date)}>Search</button>

   
    <div>
      <table>
        <thead>
          <tr>
            <th>Truck id</th>
            <th>Truck name</th>
            <th>Truck capacity</th>
          </tr>
        </thead>
        <tbody>
        {trucks.map((trucks, index) => (
              <tr key={index} align="left">
        <td>{trucks.truckId}</td>
        <td>{trucks.name}</td>
        <td>{trucks.capacity}</td>
        </tr>))}
        </tbody>
      </table>
    </div>
    </div>
    
  )
  

}
export default App;
