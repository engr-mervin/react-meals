import Header from "./components/Layout/Header.js";
import Meals from "./components/Meals/Meals.js";
import Cart from "./components/Cart/Cart.js";
import CartProvider from "./store/CartProvider.js";
import { useState } from "react";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = function () {
    console.log("cart button clicked");
    setCartIsShown(true);
  };
  const hideCartHandler = function () {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown ? <Cart onClick={hideCartHandler}></Cart> : <></>}
      <Header onClick={showCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
