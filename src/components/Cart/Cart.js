import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import s from "./Cart.module.css";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCxt = useContext(CartContext);
  const totalAmount = `Ksh${cartCxt.totalAmount.toFixed(2)}`;
  const cartHasItems = cartCxt.items.length > 0;

  const incrementItemHandler = (item) => {
    cartCxt.addItem({ ...item, quantity: 1 });
  };
  const decrementItemHandler = (id) => {
    cartCxt.removeItem(id);
  };

  return (
    <Modal closeCart={props.onCartClose}>
      <ul className={s["cart-items"]}>
        {cartCxt.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={decrementItemHandler.bind(null, item.id)}
            onAdd={incrementItemHandler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={s.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={s.actions}>
        <button className={s["button--alt"]} onClick={props.onCartClose}>
          Close
        </button>
        {cartHasItems && <button className={s.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
