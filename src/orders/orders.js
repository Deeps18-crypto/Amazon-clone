import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useStateValue } from "../Stateprovider";
import Order from "./order";
import "./orders.css";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setorders] = useState();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setorders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setorders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      {user ? (
        <h1>Yours Orders</h1>
      ) : (
        <h1>Hey! SignIn to add products and get Orders!!</h1>
      )}

      <div className="order__order">
        {orders?.map((orders) => (
          <Order order={orders} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
