//TODO import statements from react

import { useState, useEffect } from "react";
import "./myGuitars.css";

//TODO fetch the new Guitar object from the database
export const DisplayMyGuitar = ({ guitarTermState }) => {
  const [newGuitars, setNewGuitar] = useState([]);
  const [myGuitars, setMyGuitars] = useState([]);
  const [filteredGuitars, setFilteredGuitars] = useState([]);

  const localGuitarUser = localStorage.getItem("guitar_user");
  const guitarUserObject = JSON.parse(localGuitarUser);

  useEffect(() => {
    fetch(
      "http://localhost:8088/customGuitar?_expand=hardwareType&_expand=bodyStyle&_expand=bodyWoodType&_expand=neckShape&_expand=neckWoodType"
    )
      .then((response) => response.json())
      .then((customGuitarArray) => {
        setNewGuitar(customGuitarArray);
      });
  }, []);

  useEffect(() => {
    if (guitarUserObject.staff) {
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
      const searchedGuitars = myGuitars.filter((myGuitar) =>
        myGuitar.guitarName.startsWith(guitarTermState)
      );
      setFilteredGuitars(searchedGuitars);
    } else {
      setFilteredGuitars(myGuitars);
    }

    //!
  }, [guitarTermState, myGuitars]);

  const deleteButton = (customGuitar) => {
    return (
      <button
        onClick={() => {
          fetch(`http://localhost:8088/customGuitar/${customGuitar.id}`, {
            method: "DELETE",
          }).then(() => {
            fetch(
              "http://localhost:8088/customGuitar?_expand=hardwareType&_expand=bodyStyle&_expand=bodyWoodType&_expand=neckShape&_expand=neckWoodType"
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
  const handlePurchaseButtonClick = () => {
    alert("Congratulations! Your guitar has been purchased!");
  };

  //!May need to change newGuitar to filteredGuitar?
  return (
    <>
      <h2>My Guitars</h2>

      <article className="newGuitar">
        {filteredGuitars.map((filteredGuitar) => {
          return (
            <section className="newGuitar" key={filteredGuitar.id}>
              <header>{filteredGuitar.guitarName}</header>
              <ul>
                <h3>Components</h3>
                <li className="bodyStyle">
                  Body Style - {filteredGuitar.bodyStyle.style}
                </li>
                <li className="bodyWoodType">
                  Body Wood Type - {filteredGuitar.bodyWoodType.type}
                </li>
                <li className="neckShape">
                  Neck Shape - {filteredGuitar.neckShape.shape}
                </li>
                <li className="neckWoodType">
                  Neck Wood Type - {filteredGuitar.neckWoodType.type}
                </li>
                <li className="hardware">
                  Hardware - {filteredGuitar.hardwareType.type}
                </li>

                <h3>Total Price</h3>
                <li className="totalPrice">${filteredGuitar.guitarPrice}</li>

                <button
                  onClick={(clickEvent) =>
                    handlePurchaseButtonClick(clickEvent)
                  }
                  className="btn btn-primary"
                >
                  Purchase Guitar
                </button>

                {deleteButton(filteredGuitar)}
              </ul>
            </section>
          );
        })}
      </article>
    </>
  );
};
