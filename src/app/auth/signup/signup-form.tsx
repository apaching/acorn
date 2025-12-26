"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import showToast from "@/lib/toast";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(formData: SignUpFormData) {
    try {
      setLoading(true);

      await signUp(formData);

      router.replace("/auth/success");
    } catch (error) {
      if (error instanceof Error) {
        showToast({ message: error.message, type: "error" });
      } else {
        showToast({
          message: "Something went wrong! Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-24 flex w-full flex-1 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-xs flex-col space-y-12"
        noValidate
      >
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
            <Input
              type="text"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-destructive/90 text-xs">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="font-bold">
              Last Name
            </Label>
            <Input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-destructive/90 text-xs">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-destructive/90 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold">
              Password
            </Label>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-destructive/90 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-bold">
              Confirm Password
            </Label>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: {
                  checkMatch: (value: string) => {
                    if (value !== getValues("password"))
                      return "Passwords do not match!";
                  },
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-destructive/90 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Button variant={loading ? "loading" : "default"} className="w-full">
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href={"/auth/signin"}
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
