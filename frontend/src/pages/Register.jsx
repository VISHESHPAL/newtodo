import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({name: "", email:"", password:"" });
  console.log(form)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register(form)
        }}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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

export default Register;
