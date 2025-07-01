"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/admin/sendotp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) setStep("otp");
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/admin/verifyotp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) window.location.href = "/admin";
  };

  return (
    <div className="p-6">
      {step === "email" ? (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            className="border p-2"
          />
          <button onClick={sendOtp} className="bg-black text-white px-4 py-2">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2"
          />
          <button onClick={verifyOtp} className="bg-black text-white px-4 py-2">
            Verify
          </button>
        </>
      )}
    </div>
  );
}
