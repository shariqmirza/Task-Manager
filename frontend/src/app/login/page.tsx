"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const router=useRouter();

  const login =  async () => {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.access_token);

  router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-3 p-10 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Login</h1>
      <input className="border p-2" placeholder="Email"
        onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Password"
        onChange={e=>setPassword(e.target.value)} />
      <button onClick={login} className="bg-black cursor-pointer text-white p-2">
        Login
      </button>
      <p className="text-sm mt-3 text-center">
  No account?{" "}
  <a href="/register" className="underline">
    Register
  </a>
</p>
    </div>
  );
}