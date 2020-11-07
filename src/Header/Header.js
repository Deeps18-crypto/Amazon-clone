import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../Stateprovider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const authhadler = () => {
    auth.signOut();
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input className="header__searchinput" type="text" />
        <SearchIcon className="header__searchicon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div className="header__option" onClick={authhadler}>
            <span className="header__optinLineOne">
              {!user ? "Helo,Guest" : user.email}
            </span>

            <span className="header__optinLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optinLineOne">Return</span>
            <span className="header__optinLineTwo">Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optinLineOne">Your</span>
          <span className="header__optinLineTwo">Prime</span>
        </div>
        {user ? (
          <Link to="/checkout">
            <div className="header__optionbasket">
              <ShoppingBasketIcon />
              <span className="header__optinLineTwo header__basketCount">
                {basket.length}
              </span>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
