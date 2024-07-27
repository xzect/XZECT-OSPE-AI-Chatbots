"use client"

import Modal from "@/components/Modal"
import Input from "@/components/UI/Input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useCallback, useState } from "react"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = useCallback(
    (e: any) => {
      const name = e.target.name
      const value = e.target.value

      setFormData({ ...formData, [name]: value })
    },
    [formData]
  )

  const handleRegister = async () => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      const data = await response.json()
      setErrorMessage(data?.message)
    } else {
      signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/",
      })
    }
  }

  const bodyContent = (
    <>
      <Input
        inputId="name"
        name="name"
        required
        inputType="text"
        label="Enter your name"
        placeholder="Johne Doe"
        value={formData.name}
        onChangeValue={handleChange}
      />
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
  )

  const footerContent = (
    <p>
      Already register?
      <Link href="/login" className="text-blue-600 font-semibold">
        {" "}
        Log In
      </Link>
    </p>
  )
  return (
    <Modal
      title="Register"
      buttonLabel="Register"
      body={bodyContent}
      footerLabel={footerContent}
      onSubmit={handleRegister}
      errorMessage={errorMessage}
    />
  )
}

export default RegisterPage
