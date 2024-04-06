import { Metadata } from "next";
import { LoginTemplate } from "../components/login/LoginTemplate";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return <LoginTemplate />;
}
