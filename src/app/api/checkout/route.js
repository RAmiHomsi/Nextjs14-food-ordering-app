import mongoose from "mongoose";
const stripe = require("stripe")(process.env.MY_STRIPE_SECRET_KEY);
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/app/models/Order";
import MenuItems from "@/app/models/MenuItems";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItems.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    //if the product has sizes
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    //if the product has extras
    cartProduct.extras?.forEach((cartProductExtraThing) => {
      const extraThingInfo = productInfo.extraIngredientPrices.find(
        (extra) => extra._id.toString() === cartProductExtraThing._id.toString()
      );
      if (extraThingInfo) {
        productPrice += extraThingInfo.price;
      }
    });

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100, // * 100 because stripe use cents
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems, // Define the line items for the checkout session
    mode: "payment",
    customer_email: userEmail, // Provide the customer's email for communication and identification.
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1", // URL to redirect after successful payment
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1", // URL to redirect if the payment process is canceled.
    //metadata is additional information. It helps provide context or additional details for tracking and associating payments with specific orders
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() }, // Attach metadata to the payment intent,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" }, // 500=5$ * 100 because stripe use cents
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
