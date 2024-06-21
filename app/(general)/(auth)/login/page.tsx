import Link from "next/link";
import Image from "next/image";
import LoginForm from "./_components/LoginForm";

export default function Login() {
  return (
    <div className="w-full lg:grid  lg:grid-cols-2 h-[90vh] ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>

          <LoginForm />

          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
      </div>
    </div>
    // <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    //   <Link
    //     href="/"
    //     className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //     >
    //       <polyline points="15 18 9 12 15 6" />
    //     </svg>{" "}
    //     Back
    //   </Link>

    //   <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
    //     <label className="text-md" htmlFor="email">
    //       Email
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       name="email"
    //       placeholder="you@example.com"
    //       required
    //     />
    //     <label className="text-md" htmlFor="password">
    //       Password
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       type="password"
    //       name="password"
    //       placeholder="••••••••"
    //       required
    //     />
    //     <SubmitButton
    //       formAction={signIn}
    //       className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
    //       pendingText="Signing In..."
    //     >
    //       Sign In
    //     </SubmitButton>
    //     <SubmitButton
    //       formAction={signUp}
    //       className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    //       pendingText="Signing Up..."
    //     >
    //       Sign Up
    //     </SubmitButton>
    //     {searchParams?.message && (
    //       <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
    //         {searchParams.message}
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
}
