import React, { useEffect } from "react";
import Header from "./Header/Header";
import Home from "./Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Header/Checkout/Checkout";
import Login from "./login/login";
import { useStateValue } from "./Stateprovider";
import { auth } from "./firebase";
import Payment from "./Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./orders/orders";
import Createlogin from "./login/createlogin/createlogin";

const promise = loadStripe(
  "pk_test_51HQUVkE7vtArFvEpLYp0PzXIs4EsJVYkpRd4f3W7BzJx6NrQByVW58kc13MNjlrWPycCz7kpUA3E9Atjvr1nMVnh000AWnLwYX"
);

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
     // console.log("THE user is >>>", authuser);

      if (authuser) {
        // the user is logged in
        dispatch({
          type: "SET__USER",
          user: authuser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET__USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/create account">
          <Createlogin />
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
