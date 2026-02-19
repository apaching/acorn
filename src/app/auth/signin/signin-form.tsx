"use client";

import Link from "next/link";
import { useState } from "react";
import showToast from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignInFormData) {
    try {
      setLoading(true);

      await signIn(formData);

      router.replace("/dashboard");
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
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <h2 className="text-muted-foreground text-sm">
            Please enter your details
          </h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-destructive/90 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Button variant={loading ? "loading" : "default"} className="w-full">
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              href={"/auth/signup"}
              className="underline underline-offset-4 hover:cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
