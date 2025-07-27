"use client";

import React, { useRef, useState, useEffect } from "react";

interface OtpInputProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  loading?: boolean;
  error?: string;
}

const OTP_LENGTH = 6;
const OTP_TIMER = 300; // seconds

export default function OtpInput({
  email,
  onVerify,
  onResend,
  loading,
  error,
}: OtpInputProps) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(OTP_TIMER);
  const [expired, setExpired] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Timer logic
  useEffect(() => {
    if (timer <= 0) {
      setExpired(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Focus next input on change
  const handleChange = (idx: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    setOtp(newOtp);
    if (value && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "e") {
      e.preventDefault();
    }
  };

  // Resend OTP
  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(OTP_TIMER);
    setExpired(false);
    inputsRef.current[0]?.focus();
    onResend();
  };

  // Verify OTP
  const handleVerify = () => {
    if (otp.join("").length === OTP_LENGTH && !expired) {
      onVerify(otp.join(""));
    }
  };

  // Timer display
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold text-primary mb-1">OTP Verification</h2>
      <p className="text-muted-foreground text-center text-sm mb-2">
        Enter the OTP you received at{" "}
        <span className="text-primary font-semibold">{email}</span>
      </p>
      <div className="flex justify-center gap-2 mb-2 otp-input">
        {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            disabled={expired || loading}
            value={otp[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl bg-blue-100 dark:bg-blue-900 border-primary focus:border-primary/80 focus:ring-2 focus:ring-primary outline-none text-primary transition-all duration-200 ${
              expired ? "border-red-500 animate-pulse" : ""
            }`}
            autoFocus={idx === 0}
          />
        ))}
      </div>
      <button
        onClick={handleVerify}
        disabled={loading || expired || otp.join("").length !== OTP_LENGTH}
        className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-primary transition text-base"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      <div className="resend-text text-sm mt-2 text-muted-foreground flex flex-col items-center gap-1">
        {expired ? (
          <span className="expired text-red-500 animate-pulse">Code expired</span>
        ) : (
          <span id="timer" className="text-primary font-semibold">
            ({minutes}:{seconds.toString().padStart(2, "0")})
          </span>
        )}
        <span>
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading || !expired && timer > 0}
            className="text-primary font-semibold hover:underline disabled:opacity-50 transition-opacity"
          >
            Resend OTP
          </button>
        </span>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}