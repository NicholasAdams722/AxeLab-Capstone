

export const GuitarDetail = ({filteredGuitar, handlePurchaseButtonClick, deleteButton}) => {

    return (
        <section className="newGuitarCard" key={filteredGuitar.id}>
              <img
                className="body-style-img"
                src={filteredGuitar.bodyStyle.image}
              />

              <header className="guitarCard-name">
                {filteredGuitar.guitarName}
              </header>
              <ul className="components">
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
                <div className="total-price">
                  <h3>Total Price</h3>
                  <li className="totalPrice-number">
                    ${filteredGuitar.guitarPrice}
                  </li>
                </div>
                 <button
                  onClick={(clickEvent) =>
                    handlePurchaseButtonClick(clickEvent, filteredGuitar)
                  }
                  className="btn-purchase"
                >
                  Purchase Guitar
                </button>
                
                {deleteButton(filteredGuitar)} 
              </ul>
            </section>
    )
}