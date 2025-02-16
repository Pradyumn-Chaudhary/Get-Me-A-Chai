"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_user, payment_form) => {
  try {
    let user = await User.findOne({ username: to_user });
    let secret = user.razorpaysecret;
    let id = user.razorpayid;

    if (!id || !secret) {
      throw new Error("Razorpay credentials are missing.");
    }

    // ✅ Connect to the database
    await connectDB();

    // ✅ Create a new Razorpay instance
    const razorpay = new Razorpay({
      key_id: id,
      key_secret: secret,
    });

    // ✅ Create a new order in Razorpay
    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    // ✅ Save the payment request to the database
    await Payment.create({
      order_id: order.id,
      to_user: to_user,
      name: payment_form.name,
      message: payment_form.message,
      amount: amount,
    });

    return { success: true, order };
  } catch (error) {
    console.error("Error initiating payment:", error);
    return { success: false, error: error.message };
  }
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username: username });
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};
export const fetchpayments = async (username) => {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();
  return p;
};
export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data);
  await User.updateOne({ email: ndata.email }, ndata);
};

export const fetchsearch = async (prefix) => {
  await connectDB();
  const users = await User.find({
    username: { $regex: `^${prefix}`, $options: "i" }, // Case-insensitive search
  })
    .select("username profilepic bio")
    .limit(7)
    .lean();
  return users;
};
