import React, { useState, useEffect } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Replace with your public Stripe key
const stripePromise = loadStripe(
  "pk_test_51NP4gMEUEvp2Bl5J32vjhtglGZZ7rgyu5TG6E3OftoU7cwEVnM4csXnnlwL3vvOY5cMbbe2kyrX0FnY00tINMEc700zXkeX41a"
);

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentStatus, setPaymentStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://your-website.com/order/complete",
      },
    });

    if (error) {
      setPaymentStatus(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentStatus(
        `Payment successful! PaymentIntent ID: ${paymentIntent.id}`
      );
    }

    setIsProcessing(false);
  };

  const paymentElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2 className="form-title">Complete Payment</h2>
      <div className="form-row">
        <PaymentElement
          options={paymentElementOptions}
          className="stripe-payment-element"
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="submit-button"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </form>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post("/api/create-payment-intent", {
          amount: 5000, // Example amount in cents
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
