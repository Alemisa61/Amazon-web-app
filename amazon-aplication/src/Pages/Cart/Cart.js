import React, { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/Productcard";
import classes from "../Cart/Cart.module.css";
import CurrencyFormat from "../../Components/Currencyformat/Currencyformat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";

export default function Cart() {
  const [{basket}, dispatch] = useContext(DataContext);
  // const { basket } = state;
  const total = basket.reduce((alemisa, ararsa) => {
    return ararsa.price * ararsa.amount + alemisa;
  }, 0);

 const increment = (ite) => {
   dispatch({
     type: Type.ADD_TO_BASKET,
    item: ite
   });
 };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <div>
      <Layout><Header/></Layout>
      <section className={classes.cart}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Oops, your basket is empty</p>
          ) : (
            basket?.map((item) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    {...item}
                    flex={true}
                    renderDesc={true}
                    renderadd={false}
                  />
                  <div className={classes.btn}>
                    <button
                      className={classes.but}
                      onClick={() => increment(item)}
                    >
                      <span>
                        <IoIosArrowUp size={20} />
                      </span>
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.but}
                      onClick={() => decrement(item.id)}
                    >
                      <span>
                        <IoIosArrowDown size={20} />
                      </span>
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div className={classes.price}>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>this order contains a gift</small>
            </span>
            <Link to="/payments">Continue to Checkout</Link>
          </div>
        )}
      </section>
    </div>
  );
}
