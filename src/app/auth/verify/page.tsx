import AuthHeader from "../auth-header";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[40%_60%]">
      <div className="bg-background flex flex-col">
        <AuthHeader />
        <div className="space-y-2">
          <h1>Verify Your Email Address`</h1>
        </div>
      </div>
      <div className="bg-muted hidden lg:block" />
    </main>
  );
}
