import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css"
//Create "contact us" info page
export const CreateContact = () => {
  const navigate = useNavigate();

  const localGuitarUser = localStorage.getItem("guitar_user");
  const guitarUserObject = JSON.parse(localGuitarUser);

  //Use State for new contactUs message
  const [newContact, update] = useState({
    userId: 0,
    email: "",
    firstName: "",
    lastName: "",
    message: "",
  });

  const handleSendMessageButtonClick = (event) => {
    event.preventDefault();

    //Then I need to create a Javascript object that contains all required properties
    // TODO: Create the object to be saved to the API
    const messageToSendToAPI = {
      //Check if this matches with JSX
      userId: guitarUserObject.id,
      email: newContact.email,
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      message: newContact.message,
    };

    //! This fetch POSTS the new object to the products array in the API
    return fetch(`https://axe-lab-api-heroku-d1df485bea79.herokuapp.com/contactUs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        alert(`Message Sent. We appreciate the feedback!`);
        navigate("/myguitars");
      });
  };

  return (
    <fieldset className="contact-form">
      <div className="form-group">
        <label htmlFor="emailAddress">EMAIL</label>
        <input
          required
          autoFocus
          type="text"
          className="form-control"
          placeholder=""
          value={newContact.email}
          onChange={(evt) => {
            const copy = { ...newContact };
            copy.email = evt.target.value;
            update(copy);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="emailAddress">FIRST NAME</label>
        <input
          required
          autoFocus
          type="text"
          className="form-control"
          placeholder=""
          value={newContact.firstName}
          onChange={(evt) => {
            const copy = { ...newContact };
            copy.firstName = evt.target.value;
            update(copy);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="emailAddress">LAST NAME</label>
        <input
          required
          autoFocus
          type="text"
          className="form-control"
          placeholder=""
          value={newContact.lastName}
          onChange={(evt) => {
            const copy = { ...newContact };
            copy.lastName = evt.target.value;
            update(copy);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="emailAddress">MESSAGE</label>
        <input
          required
          autoFocus
          type="text"
          className="form-control"
          placeholder=""
          value={newContact.message}
          onChange={(evt) => {
            const copy = { ...newContact };
            copy.message = evt.target.value;
            update(copy);
          }}
        />
      </div>
      <>
        <button
          onClick={(clickEvent) => handleSendMessageButtonClick(clickEvent)}
          className="btn send-message"
        >
          SEND MESSAGE
        </button>
      </>
    </fieldset>
  );
};
