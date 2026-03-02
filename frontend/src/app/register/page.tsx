"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const router=useRouter();

  const register = async () => {
    try {
      await api.post("/auth/register",{ email,password });
      alert("Registered successfully");
      router.push("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Register</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-black text-white cursor-pointer w-full py-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}