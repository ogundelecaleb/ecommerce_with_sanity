import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { PaystackButton } from "next-paystack";
import { urlFor } from "../lib/client";

const Paymentform = () => {
  const { totalPrice, cartItems } = useStateContext();

  const publicKey = "pk_test_f74979a16e937b35fa78b60d796d8d19171d70b4";
  const amount = totalPrice * 100;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [itemName, setItemName] = useState('');


  useEffect(() => {
    const itemName = cartItems.map((item) => {
      return<>
      {item.name}
      {item.quantity}
      </> 
    });
    setItemName(itemName)
  }, []);


  // useEffect(() => {
  //   const cartItems =() => {
  //     setItem(cartItems.name);
  //   };
  // }, []);

  const renderedList = cartItems.map((item) => {
    return (
      <div className="product" key={item._id}>
        <img src={urlFor(item?.image[0])} className="cart-product-image" />
        <div className="item-desc">
          <div className="flex top">
            <h5>{item.name}</h5>
            <h4>#{item.price}</h4>
          </div>
        </div>
      </div>
    );
  });

  const custom_fields = [
    {
      display_name: { itemName },
      variable_name: { name },
      value: { email },
    },
    {
      display_name: { name },
      variable_name: { name },
    },
  ];
  const componentProps = {
    email,
    amount,
    metadata: {
      custom_fields,
    },
    publicKey,
    callback_url: "/success",
    text: "Buy Now",
    onSuccess: () => {
      setEmail("");
      setName("");
      setPhone("");
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <div className="overlay-effect"></div>
          
            {renderedList}
        
          <div className="item-details">
            <p className="item-details__title">Total:</p>
            <p className="item-details__amount">NGN {totalPrice}</p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentform;
