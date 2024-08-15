// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../../Components/Layout/Layout";
// import Header from "../../Components/Header/Header";
// import { database } from "../../Utility/Firebase";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import classes from "../Orders/Orders.module.css";
// import ProductCard from "../../Components/Product/Productcard";

// export default function Orders() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user) {
//        database
//         .collection("user")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           console.log();
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               Id: doc.id,
//               data: doc.data()
             
//             }))
//           );
           
//         });

     
//     } else {
//       setOrders([]);
//     }
//   }, [user]);

//   return (
//     <div>
//       <Layout>
//         <Header />
//         <section className={classes.container}>
//           <div className={classes.orders_container}>
//             <h2>Your Orders</h2>
//             <div>
//               {orders?.map((order,i) => (
//                 <div key={i}>
//                   <hr />
//                   <p>Order Id:{order?.Id}</p>
//                   {orders?.data?.alemisa?.map((order) => (
//                     <ProductCard flex={true} {...order} key={order.Id} />
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </Layout>
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/Header/Header";
import { database } from "../../Utility/Firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "../Orders/Orders.module.css";
import ProductCard from "../../Components/Product/Productcard";

export default function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      database
        .collection("user")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              Id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div>
      <Layout>
        <Header />
        <section className={classes.container}>
          <div className={classes.orders_container}>
            <h2>Your Orders</h2>
            { orders.length=== 0 && <div style={{padding :"20px"}}>your order is empty</div>} 
            <div>
              {orders?.map((order, i) => (
                <div key={i}>
                  <hr />
                  <p>Order Id: {order?.Id}</p>
                  {order?.data?.alemisa?.map((product, j) => (
                    <ProductCard
                      flex={true}
                      {...product}
                      key={j}
                      renderDesc={false}
                      renderadd={false}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
