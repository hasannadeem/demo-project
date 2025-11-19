import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500">Redirecting...</div>
    </div>
  );
}
