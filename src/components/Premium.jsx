import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const varifyPremiumUser = async () => {
    setIsUserPremium(true);//locally check
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
      // alert("Congratulations! You are now a premium member.");
    } catch (error) {
      console.error("Error verifying payment:", error);
      // alert("Payment verification failed. Please contact support.");
    }
  };

  useEffect(() => {
    // varifyPremiumUser();
  }, []);

  const handleBuyClick = async (type) => {
    try {
      console.log("1");
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );
      console.log("2", order.data);

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect with developers worldwide",
        order_id: orderId,
        prefill: {
          name: notes?.firstName + " " + notes?.lastName,
          email: notes?.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: varifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return isUserPremium ? (
    <div className="m-10">
      <h1 className="font-bold text-3xl">You are a Premium Member!</h1>
      <p>Enjoy your exclusive benefits and features.</p>
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>- chat with other users</li>
            <li>- 100 connections per day</li>
            <li>- Blue badge</li>
            <li>- 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl"> Gold Membership</h1>
          <ul>
            <li>- chat with other users</li>
            <li>- infinite connections per day</li>
            <li>- Blue badge</li>
            <li>- 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
