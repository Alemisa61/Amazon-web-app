// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./Landing/Landing";
// import Signup from "./Authen/Authentic";
// import Payment from "./Payement/Payment";
// import Orders from "./Orders/Orders";
// import Cart from "./Cart/Cart";
// import Header from "../Components/Header/Header";
// import Result from "./Result/Result";
// import Productdetail from "./Productdetail/Productdetail";

// export default function Routing() {
//   return (
//     <div>
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/auth" element={<Signup />} />
//           <Route path="/payments" element={<Payment />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/category/:Categoryname" element={<Result />} />
//           <Route path="/products/:ProductId" element={<Productdetail />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import Signup from "./Authen/Authentic";
import Payment from "./Payement/Payment";
import Orders from "./Orders/Orders";
import Cart from "./Cart/Cart";
import Header from "../Components/Header/Header";
import Result from "./Result/Result";
import Productdetail from "./Productdetail/Productdetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../Components/Protectroute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51PeWLrCepvPG60btzcbGADP5HWBFK1EslakVF9siNKhFzLdR0MLuM7orZbr6dy57bNDmopnXWM1NbPS6DJxNeIEr00VJijNCNw"
);

export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Header />} /> */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                message={"you must login to pay"}
                relead={"/payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                message={"you must login to see your order"}
                relead={"/orders"}
              >
                <Elements stripe={stripePromise}>
                  <Orders />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:Categoryname" element={<Result />} />
          <Route path="/products/:ProductId" element={<Productdetail />} />
        </Routes>
      </Router>
    </div>
  );
}
