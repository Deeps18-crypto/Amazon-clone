import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { useStateValue } from "../../../Stateprovider";
import { getBasketTotal } from "../../../store/reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket }] = useStateValue();
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p className="subtotal__para">
              Subtotal ({basket.length} items) : <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </div>
        )}
        decimalScale={5}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
