import { Order } from "@/app/models/Order";

// Use this sample code to handle webhook events in your integration to receive real-time notifications whenever certain events occur within your Stripe account.
const stripe = require("stripe")(process.env.MY_STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text(); //get the request payload as a buffer
    const signSecret = process.env.MY_STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("stripe error");
    console.log(e);
    return Response.json(e, { status: 400 });
  }
  //console.log(event);

  // Handle the event
  //can pick any event type to rely on
  if (event.type === "checkout.session.completed") {
    //console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return Response.json("ok", { status: 200 });
}
