import mongoose from "mongoose";
import User from "../../models/User";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();
  const pass = body.password;

  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters"); // Use 'throw' to actually throw the error
  }

  const createdUser = await User.create({
    email: body.email,
    password: body.password,
  });

  return Response.json(createdUser);
}
