import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Productcard from "../../Components/Product/Productcard";
import classes from "../../Components/Product/Product.module.css";
import { ProductURL } from "../../BaseURl/BaseURL";
import Loader from "../../Components/Loader/Loader";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";

export default function Result() {
  const { Categoryname } = useParams();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(Categoryname);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${ProductURL}/products/category/${Categoryname}`)
      .then((res) => {
        setResult(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  }, []);

  console.log(result);

  return (
    <>
      <Layout>
        <Header />
      </Layout>
      <div>
        <div>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>/Category: {Categoryname}</p>
          <hr />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <section className={classes.product_container}>
            {result.map((resul) => (
              <Productcard key={resul.id} {...resul} />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
