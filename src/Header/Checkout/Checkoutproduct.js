import React, { forwardRef } from "react";
import "./Checkoutproduct.css";
import { useStateValue } from "../../Stateprovider";

const Checkoutproduct = forwardRef(
  ({ image, id, price, title, rating, hideButton }, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeitems = () => {
      dispatch({ type: "REMOVE__ITEM", id: id });
    };
    return (
      <div ref={ref} className="checkoutproduct">
        <img className="checkoutproduct__image" src={image} alt="" />
        <div className="checkoutproduct__info">
          <p className="checkoutproduct__title">{title}</p>
          <p className="checkoutproduct__price">
            <strong>₹</strong>
            <strong>{price}</strong>
          </p>
          <div className="checkoutproduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>🌠</p>
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeitems}>Remove from Basket</button>
          )}
        </div>
      </div>
    );
  }
);
export default Checkoutproduct;
