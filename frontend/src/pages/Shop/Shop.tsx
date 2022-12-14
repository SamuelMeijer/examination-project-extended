import React, { useState, useEffect, useRef } from "react";
import Styles from "./shop.module.css";

import { useAuthenticatedUser } from "../../hooks/authenticatedUserHook";
import { useAuthenticatedUserHighscore} from "../../hooks/authenticatedUserHighscoreHook";

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

interface userOrdersInterface {
  id: number;
  attributes: {
    username: string;
    shopitems: {
      data: shopItemInterface[]
      }
    }
}

export default function Shop() {
  const authenticatedUser = useAuthenticatedUser()
  const authenticatedUserHighscore = useAuthenticatedUserHighscore()

  const [shopItems, setShopItems] = useState<shopItemInterface[]>([]);
  const [userOrders, _setUserOrders] = useState<userOrdersInterface[]>([]);
  const [purchaseMessage, setPurchaseMessage] = useState<string>('')
  
  const userOrdersRef = useRef(userOrders);
  const setUserOrders = (data: userOrdersInterface[]) => {
    userOrdersRef.current = data;
    _setUserOrders(data);
  }


  const handleOnClick = (event: React.MouseEvent) => {
    event.preventDefault()
    
    if (!authenticatedUser) {
      setPurchaseMessage('Du måste vara inloggad för att kunna beställa')
    } else if (authenticatedUser && !authenticatedUserHighscore?.attributes.didWin) {
      setPurchaseMessage('Du måste ha fått 2048 för att kunna beställa')
    } else if (authenticatedUser && authenticatedUserHighscore?.attributes.didWin && userOrdersRef.current.length > 0) {
      setPurchaseMessage('Du har redan beställt en tröja')
    } else {
      // Placing order
      const reqBody = {
        username: authenticatedUser.user.username,
        // ID of shopitem
        shopItems: [1]
      }
      
      fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticatedUser?.jwt}`,
        },
        body: JSON.stringify({data: reqBody})
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setPurchaseMessage('Din order har accepterats')
        })
        .catch((err) => {
          setPurchaseMessage('Något gick tyvärr fel')
          console.error(err)
        });
    }
  }

  useEffect(() => {
    // Fetching shopitems
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

    if (authenticatedUser) {
      // Fetching orders
      fetch("http://localhost:1337/api/orders?populate=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticatedUser?.jwt}`,
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          // Check if the user has made any purchases
          const userMadeOrders = data.data.filter((element: any) => element.attributes.username === authenticatedUser?.user.username)

          setUserOrders(userMadeOrders)
        })
        .catch((err) => console.error(err));
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={Styles.contentContainer}>
      {shopItems.length > 0 ? (
          <section key={shopItems[0].id} className={Styles.contentBoxContainer}>
            <div
              className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}
            >
              <div className={Styles.colorDivider}>
                <h2>{shopItems[0].attributes.title}</h2>
              </div>
              <p>
                {shopItems[0].attributes.shortDescription}
              </p>
              <p>
                {shopItems[0].attributes.longDescription}
              </p>
            </div>

            <div
              className={`${Styles.innerContentContainer} ${Styles.innerRight}`}
            >
              <img src="http://localhost:1337/uploads/matteklubbentryck_208114153e.png" alt="T-Shirt with Matteklubbenprint" className={Styles.productImage}/>
              {purchaseMessage? <h3>{purchaseMessage}</h3> : null}
              <button onClick={handleOnClick}>
                Beställ
              </button>
              <div className={Styles.colorDivider} />
            </div>
          </section>
      ) : (
        null
      )}

      <section className={`${Styles.contentBoxContainer} ${Styles.midContent}`} >
            <div
              className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}
            >
              <div className={Styles.colorDivider}>
                <h2>Framtiden</h2>
              </div>
              <p>
              För att kunna beställa varan måste du vara inloggad och vinna en spelomgång av 2048.
              </p>
              <p>
              Erbjudandet är för tillfället begränsat till en vara per användare.
              Vi planerar för att i framtiden öka antalet beställbara produkter, både vad gäller mängden beställningar per användare som mängden tillgängliga produkter i webbshopen.
              </p>
            </div>

            <div
              className={`${Styles.innerContentContainer} ${Styles.innerRight}`}
            >
              <p>Projektet är nystartat och vi beklagar därför det begränsade utbudet</p> 
              <p>När du beställer registreras den epost som är kopplat till din användarkonto. Vi kommer vid ett senare tillfälle kontkata dig via epost för att ge dig möjliheten att ange storlek och adress.</p>
              <div className={Styles.colorDivider} />
            </div>
      </section>
    </section>
  );
}
