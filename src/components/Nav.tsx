import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Nav = () => {
  return (
    <nav className="navbar bg-base-100 pt-5">
      <div className="flex-1">
        <Link href="/" className="text-xl font-semibold">
          mojblog
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
};
