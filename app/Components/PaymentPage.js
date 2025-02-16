"use client";

import Script from "next/script";
import React, { useEffect, useState } from "react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  const { data: session, status } = useSession();
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [Payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (status != "loading" && !session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      // Display the success toast if session exists and paymentdone is true
      toast.success("Thanks for your payment!");
      router.push(`${username}`);
    }
  }, []); // Dependency array to trigger effect when `session` changes

  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };
  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayment = await fetchpayments(username);
    setPayments(dbpayment);
    console.log(dbpayment, Payments);
  };
  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);

    if (!a.order) {
      toast.error(a.error);
    }
    let orderId = a.order.id;

    var options = {
      key: currentUser.razorpayid, //Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/razorpay`,
      prefill: {
        name: "Get Me A Chai",
        email: "noreply@getmeachai.com",
        contact: "9876543210",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <ToastContainer />

      <div className="cover w-full">
        <img
          src={currentUser.coverpic}
          alt="Cover"
          className="object-cover w-full h-[50vh]"
        />
      </div>

      <div
        className="absolute top-[60vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-transparent border-white border-2 
  w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]"
      >
        <img
          src={currentUser.profilepic}
          alt="Profile"
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center mt-[55px] sm:mt-[65px] md:mt-[95px]">
        <div className="font-bold">@{currentUser.username}</div>
        <div className="text-sm text-slate-500 text-center">
          {currentUser.bio}
        </div>
        <div className="text-sm text-slate-500">
          {Payments.length} Payments • ₹
          {Payments.reduce((total, payment) => total + payment.amount, 0)}{" "}
          raised
        </div>
      </div>

      <div className="payment flex flex-col-reverse md:flex-row w-[95%]  justify-center gap-3 mx-auto my-7 md:h-[80vh]">
        <div className="supporter w-full bg-slate-900 text-left p-10 overflow-auto h-[80vh]">
          <h2 className="font-bold text-2xl mb-3">Supporters</h2>
          {Payments.length > 0 ? (
            Payments.map((p, i) => (
              <li key={i} className="my-2 flex items-center gap-1">
                <img src="avatar.gif" width={30} alt="" />
                <span>
                  {p.name} paid <span className="font-bold">₹{p.amount}</span>{" "}
                  with a message "{p.message}"
                </span>
              </li>
            ))
          ) : (
            <li>No payment received</li>
          )}
        </div>

        <div className="payment-made w-full bg-slate-900 p-10 text-left">
          <h2 className="font-bold text-2xl mb-3">Make Payment</h2>
          <div className="flex gap-2 flex-col">
            <input
              name="name"
              onChange={handlechange}
              value={paymentform.name}
              type="text"
              placeholder="Enter name"
              className="bg-slate-800 rounded-xl w-full p-3"
              maxLength={24}
            />
            <input
              name="message"
              onChange={handlechange}
              value={paymentform.message}
              type="text"
              placeholder="Enter message"
              className="bg-slate-800 rounded-xl w-full p-3"
              maxLength={100}
            />
            <input
              name="amount"
              onChange={handlechange}
              value={paymentform.amount}
              type="number"
              placeholder="Enter amount"
              className="bg-slate-800 rounded-xl w-full p-3"
            />
            <span className=" text-[12px]">*All fields are required</span>
            <button
              onClick={() => pay(paymentform.amount)}
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full disabled:from-slate-500 disabled:hover:from-slate-700"
              disabled={
                paymentform.name.length == 0 ||
                paymentform.message.length == 0 ||
                paymentform.amount < 1
              }
            >
              Pay
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="bg-slate-800 p-3 md:px-6 rounded-xl"
              onClick={() => setpaymentform({ ...paymentform, amount: "100" })}
            >
              ₹100
            </button>
            <button
              className="bg-slate-800 p-3 md:px-6 rounded-xl"
              onClick={() => setpaymentform({ ...paymentform, amount: "200" })}
            >
              ₹200
            </button>
            <button
              className="bg-slate-800 p-3 md:px-6 rounded-xl"
              onClick={() => setpaymentform({ ...paymentform, amount: "500" })}
            >
              ₹500
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
