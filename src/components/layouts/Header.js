"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";

const Header = () => {
  const { status, data } = useSession();
  const { cartProducts } = useContext(CartContext);
  let userName = data?.user?.name || "";

  if (userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        <Link className="text-primary text-2xl font-semibold" href={"/"}>
          PIZZAFY
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"#about"}>About</Link>
        <Link href={"#contact"}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Logout
            </button>
          </>
        )}
        {status !== "authenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Register
            </Link>
          </>
        )}
        <Link href={"/cart"} className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {cartProducts?.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full">
              {cartProducts.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
