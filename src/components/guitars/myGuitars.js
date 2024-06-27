//TODO import statements from react

import { useState, useEffect } from "react";
import "./myGuitars.css";
import { useNavigate } from "react-router-dom";
import { GuitarDetail } from "./GuitarDetail";

//TODO fetch the new Guitar object from the database
export const DisplayMyGuitar = ({ guitarTermState }) => {
  const [newGuitars, setNewGuitar] = useState([]);
  const [myGuitars, setMyGuitars] = useState([]);
  const [filteredGuitars, setFilteredGuitars] = useState([]);



  const navigate = useNavigate();
  const localGuitarUser = localStorage.getItem("guitar_user");
  const guitarUserObject = JSON.parse(localGuitarUser);

  useEffect(() => {
    fetch(
      "https://http:localhost:8088/customGuitars?_expand=hardwareType&_expand=bodyStyle&_expand=bodyWoodType&_expand=neckShape&_expand=neckWoodType"
    )
      .then((response) => response.json())
      .then((customGuitarArray) => {
        setNewGuitar(customGuitarArray);
      });
  }, []);

  useEffect(() => {
    if (guitarUserObject.isAdmin) {
      setNewGuitar(newGuitars);
    } else {
      const myGuitars = newGuitars.filter(
        (newGuitar) => newGuitar.userId === guitarUserObject.id
      );
      setMyGuitars(myGuitars);
    }
  }, [newGuitars]);

  useEffect(() => {
    if (guitarTermState.length > 0) {
      console.log(myGuitars);
      const searchedGuitars = myGuitars.filter(
        (myGuitar) =>
          myGuitar.guitarName &&
          guitarTermState &&
          myGuitar.guitarName
            .toLowerCase()
            .startsWith(guitarTermState.toLowerCase())
      );
      setFilteredGuitars(searchedGuitars);
    } else {
      setFilteredGuitars(myGuitars);
    }

  
  }, [guitarTermState, myGuitars]);

  const deleteButton = (customGuitar) => {
    return (
      <button
        className="btn-delete"
        onClick={() => {
          fetch(`https://http:localhost:8088/customGuitars/${customGuitar.id}`, {
            method: "DELETE",
          }).then(() => {
            fetch(
              "https://http:localhost:8088/customGuitars?_expand=hardwareType&_expand=bodyStyle&_expand=bodyWoodType&_expand=neckShape&_expand=neckWoodType"
            )
              .then((response) => response.json())
              .then((customGuitarArray) => {
                setNewGuitar(customGuitarArray);
              });
          });
        }}
      >
        Delete
      </button>
    );
  };

  //TODO Handle purchase button function
  const handlePurchaseButtonClick = (event, selectedGuitar) => {

    event.preventDefault()
    alert(`Congratulations! Your guitar has been purchased`);

    const purchasedGuitar = {
      //Check if this matches with JSX
      customGuitarId: selectedGuitar.id,
    };




    return fetch(`https://http:localhost:8088/newOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchasedGuitar),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/myguitars");
      });
  };

  //TODO Create dropdown to sort by price high-to-low and low-to-high
  return (
    <>
      <fieldset>
        <select
          className="sortChoice"
          onChange={(evt) => {
            const copy = [...filteredGuitars];

            if (parseInt(evt.target.value) === 1) {
              copy.sort((guitarA, guitarB) =>
                guitarA.guitarPrice > guitarB.guitarPrice ? 1 : -1
              );
              setFilteredGuitars(copy);
            } else if (parseInt(evt.target.value) === 2) {
              copy.sort((guitarA, guitarB) =>
                guitarA.guitarPrice > guitarB.guitarPrice ? -1 : 1
              );
              setFilteredGuitars(copy);
            } else {
            }
          }}
        >
          <option key="placeHolder" value="0">
            Sort by...
          </option>
          <option key="guitar" value="1">
            Price: low to high
          </option>
          <option key="placeholder" value="2">
            Price: high to low
          </option>
          {/* {
          filteredGuitars
          .map((filteredGuitar) => {
            return <div>{filteredGuitar.guitarName} - {filteredGuitar.price}</div>
          })
        } */}
        </select>
      </fieldset>

      <h2>My Guitars</h2>

      <article className="newGuitars">
        {filteredGuitars.map((guitar) => {
          return (
            <GuitarDetail key={guitar.id} filteredGuitar={guitar} handlePurchaseButtonClick={handlePurchaseButtonClick} deleteButton={deleteButton}/>
            
            
          );
        })}
      </article>
    </>
  );
};