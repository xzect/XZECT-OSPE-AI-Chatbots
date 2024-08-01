"use client";

import Modal from "@/components/Modal";
import Input from "@/components/UI/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback(
    (e: any) => {
      const name = e.target.name;
      const value = e.target.value;

      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleLogin = useCallback(() => {
    signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/",
    });
  }, [formData]);

  const bodyContent = (
    <>
      <Input
        inputId="email"
        name="email"
        required
        inputType="email"
        label="Enter email"
        placeholder="Johne@Doe.com"
        value={formData.email}
        onChangeValue={handleChange}
      />
      <Input
        inputId="password"
        name="password"
        required
        inputType="password"
        label="Enter password"
        placeholder="Password"
        value={formData.password}
        onChangeValue={handleChange}
      />
    </>
  );

  const footerContent = (
    <p>
      Don't have account?
      <Link href="/register" className="text-blue-600 font-semibold">
        {" "}
        Register
      </Link>
    </p>
  );
  return (
    <Modal
      title="Log In"
      buttonLabel="Log In"
      body={bodyContent}
      footerLabel={footerContent}
      onSubmit={handleLogin}
    />
  );
};

export default LoginPage;
