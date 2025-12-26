"use client";

import Link from "next/link";
import AuthHeader from "../auth-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <main className="grid min-h-screen lg:grid-cols-[40%_60%]">
      <div className="bg-background flex flex-col">
        <AuthHeader />
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="flex w-full max-w-xs flex-col space-y-32">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Welcome Aboard!</h1>
              <div>
                <h2 className="text-muted-foreground text-sm">
                  Your account has been registered successfully.
                </h2>
                <h2 className="text-muted-foreground text-sm">
                  You can now log in and start using your account.
                </h2>
              </div>
            </div>
            <Button
              onClick={() => {
                router.replace("/auth/signin");
              }}
            >
              Continue to Sign In
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-muted hidden lg:block" />
    </main>
  );
}
