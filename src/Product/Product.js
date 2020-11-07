import React from "react";
import "./Product.css";
import { useStateValue } from "../Stateprovider";

function Product({ title, price, rating, image, id }, props) {
  const [state, dispatch] = useStateValue();

  const addtobasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        title: title,
        id: id,
        rating: rating,
        price: price,
        image: image,
      },
    });
    //dispatch the item into the dta layer
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>

        <p className="product__price">
          <strong>₹ : </strong>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <h2 key={i}>🌠 </h2>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addtobasket}>Add to Basket</button>
    </div>
  );
}

// const maptostateprops = (state) => {
//   return {
//     basket: state.basket,
//   };
// };
// const maptodispatchprops = (dispatch) => {
//   return {
//     addtobasket: () =>
//       dispatch({
//         type: "ADD_TO_BASKET",
//         // item: {
//         //   title: title,
//         //   image: image,
//         //   id: id,
//         //   price: price,
//         //   rating: rating,
//         // },
//       }),
//   };

export default Product;
