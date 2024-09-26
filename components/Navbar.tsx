"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";

const Navbar = () => {
  const user = false;
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image src={Logo} className="cursor-pointer" alt="TikTik" />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {user ? (
          <div>Logged In</div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              }}
              
              onError={() => {
                console.log("Login failed");
              }}
              useOneTap
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
