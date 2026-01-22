import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email:"", password:"" });
  console.log(form)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(form);
        }}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
