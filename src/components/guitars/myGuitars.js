//TODO import statements from react

import { useState, useEffect } from "react";
import "./myGuitars.css";

//TODO fetch the new Guitar object from the database
export const DisplayMyGuitar = () => {
  const [newGuitar, setNewGuitar] = useState([]);
 

 

  useEffect(() => {
    fetch("http://localhost:8088/customGuitar?_expand=hardwareType&_expand=bodyStyle&_expand=bodyWoodType&_expand=neckShape&_expand=neckWoodType")
      .then((response) => response.json())
      .then((customGuitarArray) => {
        setNewGuitar(customGuitarArray);
      });
  }, []);

  const deleteButton= (customGuitar) => {
    return <button onClick = {() => {
      fetch(`http://localhost:8088/customGuitar/${customGuitar.id}`,{
      method: "DELETE",
      
    })
    
    .then(() => {
      fetch("http://localhost:8088/customGuitar?_expand=hardwareType&_expand=bodyStyle&_expand=bodyWoodType&_expand=neckShape&_expand=neckWoodType")
      .then((response) => response.json())
      .then((customGuitarArray) => {
        setNewGuitar(customGuitarArray);
      });
    })
    }}>Delete</button>
  }



  return (
    <>
      <h2>My Guitars</h2>

      <article className="newGuitar">
        {newGuitar.map((newGuitar) => {
          return (
            <section className="newGuitar" key={newGuitar.id}>
              
              <header>{newGuitar.guitarName}</header>
              <ul>
                <h3>Components</h3>
                <li className="bodyStyle">Body Style - {newGuitar.bodyStyle.style}</li>
                <li className="bodyWoodType">Body Wood Type - {newGuitar.bodyWoodType.type}</li>
                <li className="neckShape">Neck Shape - {newGuitar.neckShape.shape}</li>
                <li className="neckWoodType">Neck Wood Type - {newGuitar.neckWoodType.type}</li>
                <li className="hardware">Hardware - {newGuitar.hardwareType.type}</li>
                <h3>Total Price</h3>
                <li className="totalPrice">${newGuitar.hardwareType.price + newGuitar.neckWoodType.price + newGuitar.neckShape.price + newGuitar.bodyWoodType.price + newGuitar.bodyWoodType.price + newGuitar.bodyStyle.price}</li>
                <button>Place Order</button>
                {deleteButton(newGuitar)}
                
              </ul>
        
            </section>
          );
        })}
      </article>
    </>
    );
  };
