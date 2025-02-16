import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const PaymentSchema = new Schema(
  {
    to_user: { type: String, required: true },
    order_id: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    message: { type: String, required: true },
    amount: { type: Number, required: true },
    done: { type: Boolean, default: false }, // ✅ Fix Boolean Type
  },
  { timestamps: true } // ✅ Auto-manages `createdAt` & `updatedAt`
);

const Payment = models.Payment || model("Payment", PaymentSchema);
export default Payment;
