//TODO import statements from react

import { useState, useEffect } from "react";
import "./Messages.css";

export const Messages = () => {
const [newMessages, setNewMessage] = useState([])
    //use effect to get data from API

    useEffect(() => {
        fetch("http://localhost:8088/contactUs")
          .then((response) => response.json())
          .then((newMessageArray) => {
            setNewMessage(newMessageArray);
          });
      }, []);


return (

<>
      <h2>New Messages</h2>
      {newMessages.map((newMessage) => {
        return (
          <section className="newMessage" key={newMessage.id}>
            <article className="newMessageName">
              <button className="replyButton">reply</button>
                {newMessage.email} - 
              {newMessage.message}

            </article>
          </section>
        );
      })}
    </>

)


}