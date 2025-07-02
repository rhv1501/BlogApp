"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // Changed from Loading to loading

  const sendOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/sendotp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setStep("otp");
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error("Send OTP error:", error);
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/verifyotp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("OTP verified successfully");
        // Use router instead of window.location.href for better UX
        window.location.href = "/admin";
      } else {
        toast.error(data.error || "Failed to verify OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
      console.error("Verify OTP error:", error);
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === "email"
              ? "Enter your email to receive OTP"
              : "Enter the OTP sent to your email"}
          </p>
        </div>

        <div className="space-y-4">
          {step === "email" ? (
            <>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={sendOtp}
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                disabled={loading || !email}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                type="text"
                maxLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                disabled={loading || !otp}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                onClick={() => setStep("email")}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                disabled={loading}
              >
                Back to Email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
    </div>
  );
};
