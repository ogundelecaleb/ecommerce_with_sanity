import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
// import { PaystackButton } from "next-paystack";

// import { usePaystackPayment } from "next-paystack";

// const config = {
//     reference: (new Date()).getTime().toString(),
//     email: "ogundelecaleb13@gmail.com.com",
//     amount: 2000,
//     publicKey: 'pk_live_92702818cd044d1b12c0f4c464a5502f123ebc35',//Note:

// };

// // you can call this function anything
// const onSuccess = (reference) => {
//   // Implementation for whatever you want to do with reference and after success call.
//   console.log(reference);
// };

// // you can call this function anything
// const onClose = () => {
//   // implementation for  whatever you want to do when the Paystack dialog closed.
//   console.log('closed')
// }

// const PaystackHookExample = () => {
//     const initializePayment = usePaystackPayment(config);
//     return (
//       <div>
//           <button onClick={() => {
//               initializePayment(onSuccess, onClose)
//           }}>Paystack Hooks Implementation</button>
//       </div>
//     );
// };

// const handleCheckout = () => {
//   <PaystackHookExample />
// }

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    qty,
    setQty
  } = useStateContext();

  // const [paystackHook, setPaystackHook] = useState({
  //   key: "pk_live_92702818cd044d1b12c0f4c464a5502f123ebc35",
  //   email: "foobar@example.com",
  //   amount: totalPrice ,
  // });
  // const callback = (response) => {
  //   console.log(response); // card charged successfully, get reference here
  // };

  // const close = () => {
  //   console.log("Payment closed");
  // };

  // const getReference = () => {
  //   //you can put any unique reference implementation code here
  //   let text = "";
  //   let possible =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

  //   for (let i = 0; i < 15; i++)
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));

  //   return text;
  // };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>#{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>#{totalPrice}</h3>
            </div>
            <div className="buttons">
              <Link href='/payment' >
              <button className='buy-now' onClick={() => setShowCart(false)}>
                Buy At Normal Price
              </button>
              </Link>

              <Link href='/priceslash' >
              <button className='buy-now' onClick={() => setShowCart(false)}>
                Buy at 70%OFF
              </button>
              </Link>

              {/* <PaystackButton
                text="Checkout"
                
                callback={callback}
                close={close}
                disabled={true}
                embed={true}
                reference={getReference()}
                email={paystackHook.email}
                amount={paystackHook.amount}
                publicKey={"pk_live_92702818cd044d1b12c0f4c464a5502f123ebc35"}
                tag="button"
              /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

// {<Paystack totalPrice={totalPrice}/>}
