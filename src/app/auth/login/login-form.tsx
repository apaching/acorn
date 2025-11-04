"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="mb-24 flex w-full flex-1 items-center justify-center">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="flex w-full max-w-xs flex-col space-y-10"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <h2 className="text-muted-foreground text-sm">
            Please enter your details
          </h2>
        </div>
        <div className="space-y-12">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold">
              Password
            </Label>
            <Input />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Button className="w-full">Login</Button>
            <p className="text-sm">
              Don't have an account?{" "}
              <span className="underline underline-offset-4">Sign Up</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
