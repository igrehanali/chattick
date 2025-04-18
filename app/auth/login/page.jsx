"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/auth-context";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import "./styles.css";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields", {
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        toast.error(
          "Invalid credentials - Please check your email and password and try again.",
          {
            duration: 3000,
          }
        );
      } else {
        toast.success("Login successful!", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.", {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container fade-in-down">
      <div className="login-form-container">
        <div className="logo-container">
          <div className="logo-wrapper scale-in">
            <Image
              src="https://i.ibb.co/jkrXCjj3/Logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="welcome-text">Welcome Back</h2>
          <p className="welcome-subtitle">
            Sign in to your account to continue
          </p>
        </div>
        <form className="form" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
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
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Email address"
              />
            </div>
            <div className="password-input-wrapper">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Password"
              />
              <div className="show-password-checkbox">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="show-password">Show password</label>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <div className="remember-me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <div>
              <Link href="/auth/forgot-password" className="forgot-password">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
