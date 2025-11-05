"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="mb-24 flex w-full flex-1 items-center justify-center">
      <form className="flex w-full max-w-xs flex-col space-y-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Create An Account</h1>
          <h2 className="text-muted-foreground text-sm">
            Please enter your details
          </h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="font-bold">
              First Name
            </Label>
            <Input type="text" {...register("firstName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="font-bold">
              Last Name
            </Label>
            <Input type="text" {...register("lastName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input type="email" {...register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold">
              Password
            </Label>
            <Input type="password" {...register("password")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-bold">
              Confirm Password
            </Label>
            <Input type="password" {...register("confirmPassword")} />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Button className="w-full">Create Account</Button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href={"/auth/login"}
              className="hover:cursor-point underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
