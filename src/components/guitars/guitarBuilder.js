//Import Use State and Use Navigate
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Export a Function called guitarForm

export const GuitarBuilder = () => {
  //TODO add the correct default properties to the initial state object
  //Create a text field for the "guitar name" entry
  const guitarName = useState([]);
  const [bodyStyle, setBodyStyle] = useState([]);
  const [bodyWoodType, setBodyWoodType] = useState([]);
  const [neckShape, setNeckShape] = useState([]);
  const [neckWoodType, setNeckWoodType] = useState([]);
  const [hardwareType, setHardware] = useState([]);
  const navigate = useNavigate();

  //Use state for new guitar object
  const [newGuitar, update] = useState({
    guitarName: "",
    bodyStyleId: 0,
    bodyWoodTypeId: 0,
    neckShapeId: 0,
    neckWoodTypeId: 0,
    hardwareTypeId: 0,
  });

  //Body Style

  useEffect(() => {
    fetch("http://localhost:8088/bodyStyles")
      .then((response) => response.json())
      .then((bodyStyleArray) => {
        setBodyStyle(bodyStyleArray);
      });
  }, []);

  //Body Wood Type
  useEffect(() => {
    fetch("http://localhost:8088/bodyWoodTypes")
      .then((response) => response.json())
      .then((bodyWoodTypeArray) => {
        setBodyWoodType(bodyWoodTypeArray);
      });
  }, []);

  //Neck Shape

  useEffect(() => {
    fetch("http://localhost:8088/neckShapes")
      .then((response) => response.json())
      .then((neckShapeArray) => {
        setNeckShape(neckShapeArray);
      });
  }, []);

  //Neck Wood Type

  useEffect(() => {
    fetch("http://localhost:8088/neckWoodTypes")
      .then((response) => response.json())
      .then((neckWoodTypeArray) => {
        setNeckWoodType(neckWoodTypeArray);
      });
  }, []);

  //Hardware

  useEffect(() => {
    fetch("http://localhost:8088/hardwareTypes")
      .then((response) => response.json())
      .then((hardwareArray) => {
        setHardware(hardwareArray);
      });
  }, []);

  const handleGuitarButtonClick = (event) => {
    event.preventDefault();

    //Then I need to create a Javascript object that contains all required properties
    // TODO: Create the object to be saved to the API
    const guitarToSendToAPI = {
      //Check if this matches with JSX
      guitarName: newGuitar.name,
      bodyStyleId: newGuitar.bodyStyleId,
      bodyWoodTypeId: newGuitar.bodyWoodTypeId,
      neckShapeId: newGuitar.neckShapeId,
      neckWoodTypeId: newGuitar.neckWoodTypeId,
      hardwareTypeId: newGuitar.hardwareId,
    };

    //! This fetch POSTS the new object to the products array in the API
    return fetch(`http://localhost:8088/customGuitar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guitarToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/myguitars");
      });
  };

  //TODO link all form fields to button and add an OnChange

  return (
    <>
      <>
        <fieldset>
          <div className="form-group">
            <label htmlFor="guitarName">Guitar Name:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Your Guitar Name"
              value={guitarName.name}
              onChange={(evt) => {
                const copy = { ...guitarName };
                copy.name = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>

        <h2>Body Style</h2>

        <select
          value={newGuitar.bodyStyleId}
          onChange={(e) => {
            const copy = { ...newGuitar };
            copy.bodyStyleId = parseInt(e.target.value);
            update(copy);
          }}
        >
          <option value="guitarBodyPlaceHolder">Select a Body Style</option>

          {bodyStyle.map((bodyStyle) => {
            return (
              <option value={bodyStyle.id} key={bodyStyle.id}>
                {bodyStyle.style} - ${bodyStyle.price}
              </option>
            );
          })}
        </select>

        <h2>Body Wood Type</h2>

        <select
          value={newGuitar.bodyWoodTypeId}
          onChange={(e) => {
            const copy = { ...newGuitar };
            copy.bodyWoodTypeId = parseInt(e.target.value);
            update(copy);
          }}
        >
          <option value="guitarWoodTypePlaceHolder">
            Select a Body Wood Type
          </option>

          {bodyWoodType.map((bodyWoodType) => {
            return (
              <option value={bodyWoodType.id} key={bodyWoodType.id}>
                {bodyWoodType.type} - ${bodyWoodType.price}
              </option>
            );
          })}
        </select>

        <h2>Neck Shape</h2>

        <select
          value={newGuitar.neckShapeId}
          onChange={(e) => {
            const copy = { ...newGuitar };
            copy.neckShapeId = parseInt(e.target.value);
            update(copy);
          }}
        >
          <option value="guitarNeckShape">Select a Neck Shape</option>

          {neckShape.map((neckShape) => {
            return (
              <option value={neckShape.id} key={neckShape.id}>
                {neckShape.shape} - ${neckShape.price}
              </option>
            );
          })}
        </select>

        <h2>Neck Wood Type</h2>

        <select
          value={newGuitar.neckWoodTypeId}
          onChange={(e) => {
            const copy = { ...newGuitar };
            copy.neckWoodTypeId = parseInt(e.target.value);
            update(copy);
          }}
        >
          <option value="guitarNeckWoodType">Select a Neck Wood Type</option>

          {neckWoodType.map((neckWoodType) => {
            return (
              <option value={neckWoodType.id} key={neckWoodType.id}>
                {neckWoodType.type} - ${neckWoodType.price}
              </option>
            );
          })}
        </select>

        <h2>Hardware</h2>

        <select
          value={newGuitar.hardwareId}
          onChange={(e) => {
            const copy = { ...newGuitar };
            copy.hardwareId = parseInt(e.target.value);
            update(copy);
          }}
        >
          <option value="hardwareType">Select hardwareType</option>

          {hardwareType.map((hardwareType) => {
            return (
              <option value={hardwareType.id} key={hardwareType.id}>
                {hardwareType.type} - ${hardwareType.price}
              </option>
            );
          })}
        </select>
      </>
      <>
        <button
          onClick={(clickEvent) => handleGuitarButtonClick(clickEvent)}
          className="btn btn-primary"
        >
          Create Guitar
        </button>
      </>
    </>
  );

  //Get data from API for dropdown selects

  //TODO Create JSX to display on page
  //Create a Select Dropdown for each guitar component
  //Create a radio button for hardwareType
};
