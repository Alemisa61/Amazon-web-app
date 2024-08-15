import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currencyformat/Currencyformat";
import classes from "../Product/Product.module.css";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

export default function ProductCard(props) {
  const { id, title, price, image, rating, description } = props;
  const [state,dispatch]  = useContext(DataContext);
 
 
  

  const ratingValue = rating?.rate || 0;
  const ratingCount = rating?.count || 0;

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {id, title, price, image, rating, description},
    });
  };

  return (
    <div
      className={`${classes.Card_container} ${
        props.flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <div>
          <h3>{title}</h3>
          {props.renderDesc && (
            <div style={{ maxWidth: "750px" }}>{description}</div>
          )}
        </div>
        <div className={classes.rating}>
          Rating: <Rating value={ratingValue} precision={0.1} />
          <small>{ratingCount}</small>
        </div>
        <div>
          Price: <CurrencyFormat amount={price} />
        </div>
        {props.renderadd !== false && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
      
    </div>
  );
}
