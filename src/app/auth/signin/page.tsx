import SignInForm from "./signin-form";
import AuthHeader from "../auth-header";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[40%_60%]">
      <div className="bg-background flex flex-col">
        <AuthHeader />
        <SignInForm />
      </div>
      <div className="bg-muted hidden lg:block" />
    </main>
  );
}
