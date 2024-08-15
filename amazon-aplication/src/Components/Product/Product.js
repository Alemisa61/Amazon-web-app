import React, { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "./Productcard";
import classes from "../Product/Product.module.css";
// import { ProductURL } from "../../BaseURl/BaseURL";
import Loader from "../Loader/Loader";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProduct(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        setIsLoading(true);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.product_container}>
      {product.map((productData) => (
        <Productcard key={productData.id}  {...productData} />
      ))}
    </div>
  );
}
