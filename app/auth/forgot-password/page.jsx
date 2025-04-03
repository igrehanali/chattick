"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import "../login/styles.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address", {
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox.", {
        duration: 3000,
      });
      setEmail("");
    } catch (error) {
      toast.error(
        "Failed to send reset email. Please verify your email address.",
        {
          duration: 3000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container fade-in-down">
      <div className="login-form-container">
        <div className="logo-container">
          <div className="logo-wrapper scale-in">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="welcome-text">Reset Password</h2>
          <p className="welcome-subtitle">
            Enter your email to receive a password reset link
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link href="/auth/login" className="forgot-password">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
