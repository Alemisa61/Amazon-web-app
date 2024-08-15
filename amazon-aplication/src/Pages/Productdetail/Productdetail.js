import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {ProductURL} from "../../BaseURl/BaseURL";
import axios from "axios";
import Productcard from "../../Components/Product/Productcard";
import Loader from "../../Components/Loader/Loader";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";

export default function Productdetail() {
  const { ProductId } = useParams();
  const [detail, setDetail] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${ProductURL}/products/${ProductId}`)
      .then((res) => {
        setDetail(res.data);
        setIsLoading(false)
        console.log("Product detail:", res.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  }, [ProductId]); // Add ProductId as a dependency to re-fetch data when it changes

  console.log("Detail:", detail);

  return (
    <div>
      <Layout><Header/></Layout>
      {isLoading ? <Loader /> : <Productcard {...detail} flex={true}
      renderDesc = {true} />}
    </div>
  );
}
