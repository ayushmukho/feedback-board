"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./shared-components/Button";
import { useState } from "react";
import Spinner from "../utils/svg/Spinner";

export default function Header() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!session?.user?.name;

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };
  const handleLogin = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };
  return (
    <div className="flex max-w-2xl mx-auto justify-end p-2 gap-4 items-center">
      {isLoggedIn ? (
        <>
          <span>Hello, {session?.user?.name}!</span>
          <Button
            className="shadow-sm border border-gray-400 px-2 py-1"
            onClick={handleLogout}
          >
            {loading ? <Spinner primary={true} /> : "Logout"}
          </Button>
        </>
      ) : (
        <>
          <span>Not Logged In</span>
          <Button
            primary="true"
            className="shadow-sm border border-gray-400 px-2 py-1"
            onClick={handleLogin}
          >
            {loading ? <Spinner primary={true} /> : "LogIn"}
          </Button>
        </>
      )}
    </div>
  );
}
