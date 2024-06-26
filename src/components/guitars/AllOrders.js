//TODO import statements from react

import { useState, useEffect } from "react";
import "./myGuitars.css";

export const AllOrders = () => {
  const [newOrders, setNewOrder] = useState([]);

  useEffect(() => {
    fetch("https://axe-lab-api-heroku-d1df485bea79.herokuapp.com/newOrders?_expand=customGuitar")
      .then((response) => response.json())
      .then((newOrderArray) => {
        setNewOrder(newOrderArray);
      });
  }, []);

  const handleSpecsButtonClick = () => {
    alert(`Guitar Specs Coming Soon`);
  }
  // Display all custom guitars from API

  return (
    <>
      <h2>New Order</h2>
      {newOrders.map((newOrder) => {
        return (
          <section className="newOrders" key={newOrder.id}>
            <article className="newOrderName">
            <button onClick={(clickEvent) => handleSpecsButtonClick(clickEvent)}
          className="btn-Specs"
          >
          View Specs</button>
              New Order {newOrder.customGuitar.guitarName} has been placed.
            </article>
          </section>
        );
      })}
    </>
  );
};
