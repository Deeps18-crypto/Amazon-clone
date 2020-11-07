import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../Stateprovider";
import Checkoutproduct from "../Header/Checkout/Checkoutproduct";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "../store/reducer";
import CurrencyFormat from "react-currency-format";
import axios from "../axios/axios";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import FlipMove from "react-flip-move";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setsucceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate to charge the payment
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stipe expects the total in a currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket)}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("THE secret is >>>", clientSecret);
  console.log(":person", user);

  const Handlesubmit = async (event) => {
    event.preventDefault();
    setprocessing(true);
    // do all the fancy stripe stuff.....

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount / 100,
            created: paymentIntent.created,
          });

        setsucceeded(true);
        seterror(null);
        setprocessing(false);

        // dispatch({
        //   type: "EMPTY_BASKET",
        // });

        history.replace("/orders");
      });
  };
  const HandleChange = (event) => {
    //listen for changes in the CardElement
    //and display any errors as the customer type their card details
    setdisabled(event.empty);
    seterror(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        {/*Payment section - delivery items*/}
        <h1>
          Contains : <Link to="/checkout">({basket.length} items)</Link>
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>54321 Jeeva nagar</p>
            <p>Los Angeles,CA</p>
          </div>
        </div>

        {/*Payment section - review items*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__item">
            <FlipMove>
              {basket.map((items) => (
                <Checkoutproduct
                  image={items.image}
                  price={items.price}
                  rating={items.rating}
                  id={items.id}
                  title={items.title}
                  key={items.id}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        {/*Payment section - payment method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Section</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={Handlesubmit}>
              <CardElement onChange={HandleChange} />
              <div className="payment__price">
                <CurrencyFormat
                  renderText={(value) => (
                    <div>
                      <h2>Order Total : {value}</h2>
                    </div>
                  )}
                  decimalScale={5}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/*Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
