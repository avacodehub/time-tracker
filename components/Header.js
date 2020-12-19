import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <div className="logo">
          Time Tracker
      </div>

      
      <div>
        <Link href="/">
          <a>Track Time</a>
        </Link>
      </div>
      <div>
        <Link href="/watch">
        <a>Watch Others</a>
        </Link>
      </div>
      <div>
        <Link href="/about">
        <a>About Us</a>
        </Link>
      </div>
    </nav>
  );
}
