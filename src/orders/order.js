import React from "react";
import moment from "moment";
import Checkoutproduct from "../Header/Checkout/Checkoutproduct";
import CurrencyFormat from "react-currency-format";
import "./order.css";

function order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>
        {moment.unix(order.data.created).format("'MMMM Do YYYY, h:mm:ss a'")}
      </p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <Checkoutproduct
          image={item.image}
          price={item.price}
          rating={item.rating}
          id={item.id}
          title={item.title}
          key={item.id}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <div className="order__total">
            <h2>Order Total : {value}</h2>
          </div>
        )}
        decimalScale={5}
        value={order.data.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default order;
