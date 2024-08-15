import React, { useContext ,useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import Header from '../../Components/Header/Header';
import classes from '../../Pages/Payement/Payement.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/Productcard';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { BsCheckLg } from 'react-icons/bs';
import CurrencyFormat from '../../Components/Currencyformat/Currencyformat';
import { axiosInstant } from '../../BaseURl/axios';
 import {BeatLoader} from "react-spinners"; // ...
 import { database } from '../../Utility/Firebase';
 import { useLocation, useNavigate } from 'react-router-dom';
 import { Type } from '../../Utility/action.type';

export default function Payment() {
  const [ trigger] = useContext(DataContext);
  // const { basket } = state;
  

  const [{basket,user},dispatch] = useContext(DataContext)
  // console.log(user)
  const total = basket.reduce((alemisa, ararsa) => {
    return ararsa.price * ararsa.amount + alemisa;
  }, 0);
  const totalItem = basket?.reduce((alemisa,ararsa) =>{
  return ararsa.amount + alemisa
 },0)
 const stripe = useStripe();
 const elements = useElements();
 const navigate = useNavigate()
//  const Location = useLocation()
// console.log(Location); 
 const[cardError, setCardError] = useState(" ")
 const [processing, setProcessing] = useState(false)
 const [message ,setMessage] = useState("")
 const handleChange = (e)=>{
    console.log()
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
 }
 const handlePayment = async (e) => {
   e.preventDefault();
   // function
   try {
    setProcessing(true)
     const response = await axiosInstant({
       method: "Post",
        url: `/payment/create/?total=${total *100}`
      //  url: "http://127.0.0.1:5001/clone-2825c/us-central1/api/payment/create?total=400.5",
     });
     ;
     const clientSecret = response.data?.client_secret;
    //  console.log(clientSecret);
     const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: elements.getElement(CardElement),
       },
     });  
     setProcessing(false)
     setMessage(paymentIntent)
     console.log(paymentIntent.created)
    await database.collection("user").doc(user.uid).collection('orders').doc(paymentIntent.id).set({
  alemisa: basket,
  price: paymentIntent.amount,
  created: paymentIntent.created

});
dispatch({
  type:Type.EMPTY_BASKET,

})
navigate('/orders', {state: {msg :"you have placed new order"}})


   } catch (error) {
     console.log(error)
     setProcessing(false)
   }
 };
  return (
    <div>
      <Layout>
        <Header />
        {/* header */}
        <div className={classes.Payment_header}>
          check out ({totalItem}) items
        </div>
        {/* Payement method */}
        <section className={classes.payment}>
          {/* address */}
          <div className={classes.flex}>
            <h3>delivery address</h3>
            <div>
              {user !== null && user.email !== undefined && (
                <div>{user.email}</div>
              )}
              <div>123 react</div>
              <div>chicago</div>
            </div>
          </div>
          <hr />
          {/* product */}
          <div className={classes.flex}>
            <h3>review items and delivery</h3>
            <div>
              {basket?.map((items) => (
                <ProductCard
                  {...items}
                  flex={true}
                  renderDesc={true}
                  renderadd={false}
                />
              ))}
            </div>
          </div>
          <hr />
          {/* credit card form  */}
          <div className={classes.flex}>
            <h3>payment methods</h3>
            <div className={classes.payment_card_container}>
              <div className={classes.payment_detail}>
                <form onSubmit={handlePayment}>
                  {cardError && (
                    <small style={{ color: "red" }}> {cardError}</small>
                  )}
                  <CardElement onChange={handleChange} />
                  {/* price */}
                  <div className={classes.payment_price}>
                    <div>
                      total order|
                      <span>
                        <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <div>
                      <button type="submit">
                        {processing ? (
                          <div className={classes.loading}>
                            <BeatLoader color="green" size={20} />
                            <p>please wait</p>
                          </div>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                      <small style={{ color: "green" }}>
                        {message?.status}
                      </small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
