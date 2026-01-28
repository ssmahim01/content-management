import LoginForm from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Portfolio Panel",
  description: "Login to access your portfolio admin panel",
  keywords: ["login", "portfolio", "admin", "panel"],
};

export default function LoginPage() {
  return <LoginForm />;
}
