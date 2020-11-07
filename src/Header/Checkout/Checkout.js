import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal/Subtotal";
import Checkoutproduct from "./Checkoutproduct";
import { useStateValue } from "../../Stateprovider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__add"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg"
          alt=""
        />
        <div>
          <h4>Hello,{user?.email}</h4>
          <h1 className="checkout__title">Your shopping Basket</h1>
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
