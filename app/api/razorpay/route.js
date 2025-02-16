import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDB();

    let body = await req.formData();
    body = Object.fromEntries(body);

    let isValid = await Payment.findOne({ order_id: body.razorpay_order_id });

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "Order Id not found",
      });
    }

    //fetch the secret from database
    let user = await User.findOne({ username: isValid.to_user })
    const secret = user.razorpaysecret

    let x = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret
    );

    if (x) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { order_id: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${updatedPayment.to_user}?paymentdone=true`
      );
    } else {
      return NextResponse.json({
        succes: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
