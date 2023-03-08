import React from "react";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const priceSlash = () => {
  const { totalPrice, cartItems } = useStateContext();

  const renderedList = cartItems.map((item) => {
    return (
      <div className="product" key={item._id}>
        <img src={urlFor(item?.image[0])} className="cart-product-image" />
        <div className="item-desc">
          <div className="flex top">
            <h5>{item.name}</h5>
            <h4 className="slashed-price">
              <strike>#{item.price}</strike> #
              {item.price - item.price * (70 / 100)}
            </h4>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="App">
      <div className="slashed-price-container">
        {renderedList}

        <div className="conditions">
          <h3>Copy & Share the Link </h3>
          <h4>
            <u>www.kailebstore.com/priceslash/84-83rhr39hf</u>{" "}
          </h4>
          <p>
            <span>Note:</span> To get the Item at 70% discount, copy and share
            to your buying partners. You will be allowed to proceed payment after
            10 people initiates payment for this item
          </p>

          {/* this shows the progress of how many customers have initiated payments for this product */}
          <div className="progress-section">
          <div class="progress">
          
          <div class="progress-in" style={{width: "80%"}}></div>
          <div class="skill-percent">8/10 customer paid already</div>
        </div>

        
        <p >
          This shows the progress of how many customers initiated
          payments for this product
        </p>
          </div>
         
          <button type="button" className="btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default priceSlash;
