// 2. Updated Login Component with redirect logic
"use client";
import React, { useState } from "react";
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { cn } from "../lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Get the page user was trying to access, default to dashboard
  const from = location.state?.from?.pathname || '/dashboard'
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        email,
        password,
      })
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      console.log("Saved user:", response.data.user);
      toast.success("Login successful!");
      
      // Redirect to the originally requested page
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Failed to login.");
    }
  };
  
  return (
    <div className="relative flex min-h-screen h-[50rem] w-full max-w-full items-center justify-center bg-white dark:bg-black px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px] sm:[background-size:30px_30px] lg:[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )} />
      <div
        className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <h2 className="text-xl font-bold text-neutral-800 ">
          Welcome to OpenScroll
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 ">
          Login to OpenScroll
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <div
            className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          </div>
          <LabelInputContainer className="mb-4 ">
            <Label htmlFor="email" className="!text-neutral-800">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="!text-neutral-800">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit">
            Sign In &rarr;
            <BottomGradient />
          </button>
          <p className="mt-3">
            New to platform ? {" "}
            <Link to="/register" className="text-sm text-neutral-600 !mt-5">
              Register
            </Link>
          </p>

          <div
            className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};