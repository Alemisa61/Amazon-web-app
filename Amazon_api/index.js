
// const express = require("express");
// const cors = require("cors");
// const stripe = require("stripe")(
//   "sk_test_51PeWLrCepvPG60btjAe2XOc8kWOpPktFyULY7JeCdzfVvVzoVumNgQ7HdAum3gugz1PMXysdyricvw6jJETTs5ci00yMSS4tmE"
// );

// const app = express();
// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     Message: "success",
//   });
// });

// app.post("/payment/create/", async (req, res) => {
//   const total = req.query.total;
//   if (total > 0) {
//     console.log("payment received");

//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//       });
//       res.status(202).json({
//         client_secret: paymentIntent.client_secret,
//       });
//       console.log(paymentIntent);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         Message: "An error occurred while creating the payment intent",
//       });
//     }
//   } else {
//     res.status(401).json({
//       Message: "total value must be greater than zero",
//     });
//   }
// });


// app.listen(5000, (error) => {
//   if (error) {
//     throw error;
//   } else {
//     console.log("The server is running successfully at http://localhost:5000");
//   }
// });
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51PeWLrCepvPG60btjAe2XOc8kWOpPktFyULY7JeCdzfVvVzoVumNgQ7HdAum3gugz1PMXysdyricvw6jJETTs5ci00yMSS4tmE");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "success",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    console.log("Payment received");

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
      Message: "Total value must be greater than zero",
    });
  }
});

const port = 5000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    process.exit(1); // Terminate the process if there's an error starting the server
  } else {
    console.log(
      `The server is running successfully at http://localhost:${port}`
    );
  }
});