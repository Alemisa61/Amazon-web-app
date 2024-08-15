
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// const express = require("express")
// const cors =  require('cors')
// const dotenv = require("dotenv");
// const { Message } = require("firebase-functions/v1/pubsub");
// const stripe = require("stripe")(
//   "sk_test_51PeWLrCepvPG60btjAe2XOc8kWOpPktFyULY7JeCdzfVvVzoVumNgQ7HdAum3gugz1PMXysdyricvw6jJETTs5ci00yMSS4tmE"
// );
// const app = express()
// app.use(cors({origin :true}))
// app.use(express.json())
// app.get("/",(req,res)=>{
//     res.status(200).json({
//         Message: "success"
//     })
// })
// app.post("/payment/create/",async(req,res)=>{
// const total = req.query.total
// if(total > 0){
// console.log("payment recived");
// res.send(total);
// const paymentIntent =  await stripe.paymentIntents.create({
//     amount:total,
//     currency: "usd"
// })
// res.status(202).json(paymentIntent)
// console.log(paymentIntent)
// } else{
//    res.status(401).json({
//     Message : "total value must be greater than zero"
//    });
 
// }

// })
// exports.api = onRequest(app)
const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const { Message } = require("firebase-functions/v1/pubsub");
const stripe = require("stripe")(
  "sk_test_51PeWLrCepvPG60btjAe2XOc8kWOpPktFyULY7JeCdzfVvVzoVumNgQ7HdAum3gugz1PMXysdyricvw6jJETTs5ci00yMSS4tmE"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "success",
  });
});

app.post("/payment/create/", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    console.log("payment received");
   
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(202).json({
        client_secret: paymentIntent.client_secret,
      });
      console.log(paymentIntent);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Message: "An error occurred while creating the payment intent",
      });
    }
  } else {
    res.status(401).json({
      Message: "total value must be greater than zero",
    });
  }
});

exports.api = onRequest(app);