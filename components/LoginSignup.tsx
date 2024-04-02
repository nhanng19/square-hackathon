"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateFormInput } from "@/lib/utils";
import fetchJson, { FetchError } from "@/lib/fetchson";
import { toast } from "sonner";
const LoginSignup = ({ isLogin }: { isLogin: boolean }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginHandler = async () => {
    setIsLoading(true);
    const data: { email: string; password: string } = {
      email: email,
      password: password,
    };

    const info = validateFormInput(data);
    if (info.length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      await fetch("/api/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
    }
  };

  const signupHandler = async () => {
    setIsLoading(true);
    const data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    } = {
      email,
      password,
      firstName,
      lastName,
    };
    const info = validateFormInput(data);
    if (info.length > 0) {
      setIsLoading(false);
      toast.error("Must include: " + info.join(" "));
      return;
    }
    try {
      await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof FetchError) {
        toast.error(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="m-auto xl:w-[30vw]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Login" : "Create account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your email below to log in to your account"
              : "Just a couple of information to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="first-name"
                    placeholder="Lee"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="last-name"
                    placeholder="Robinson"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
                type="password"
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              onClick={isLogin ? loginHandler : signupHandler}
            >
              {isLogin ? "Log in" : "Create account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Create an account?" : "Have an account?"}{" "}
            <Link className="underline" href={isLogin ? "/signup" : "/login"}>
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginSignup;
