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
import LoginSignup from "@/components/LoginSignup";

export default function Login() {
  return (
      <div className="flex justify-center items-center h-screen w-full">
          <LoginSignup isLogin={true} />
    </div>
  );
}
