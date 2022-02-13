import React, { useState, useEffect } from "react";
import Styles from "./shop.module.css";

import StyledButton from "../../components/StyledButton/StyledButton";

interface shopItemInterface {
  id: number;
  attributes: {
    longDescription: string,
    price: number,
    shortDescription: string,
    size: string | null,
    title: string,
  };
}

export default function Shop() {
  const [shopItems, setShopItems] = useState<shopItemInterface[]>([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/shopitems")
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setShopItems(data.data)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={Styles.contentContainer}>
      {shopItems.length > 0 ? (
        shopItems.map((element, index) => (
          <section key={element.id} className={index % 2 !== 0 ? `${Styles.contentBoxContainer} ${Styles.midContent}` : `${Styles.contentBoxContainer}`}>
            <div
              className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}
            >
              <div className={Styles.colorDivider}>
                <h2>{element.attributes.title}</h2>
              </div>
              <p>
                {element.attributes.shortDescription}
              </p>
              <p>
                {element.attributes.longDescription}
              </p>
            </div>

            <div
              className={`${Styles.innerContentContainer} ${Styles.innerRight}`}
            >
              {/* {TODO: ADD IMAGE} */}
              <p>
                PLACE IMAGE HERE
              </p>
              
              <StyledButton textInput="Beställ" colorInput="#F78632" />
              <div className={Styles.colorDivider} />
            </div>
          </section>
        ))
      ) : (
        // TODO: Replace with Spinner
        <p>Missing content</p>
      )}
    </section>
  );
}
