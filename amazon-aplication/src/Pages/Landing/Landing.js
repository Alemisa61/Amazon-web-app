import React from 'react'
import Couresetest from '../../Components/Carousel/Couresetest';
import Parentcom from '../../Components/Category/Parentcom';
import Product from '../../Components/Product/Product';
import Layout from '../../Components/Layout/Layout';
import Header from '../../Components/Header/Header';


export default function Landing() {
  return (
    <div>
      <Layout>
        <Header/>
        <Couresetest />
        <Parentcom />
        <Product />
      </Layout>
    </div>
  );
}
