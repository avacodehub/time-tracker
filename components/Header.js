import React from "react";
import Link from "next/link";
import {Button} from "@chakra-ui/react"

export default function Header() {
  return (
    <nav>
      <div>
        <Link href="/">
          <Button variant="outline">Track Time</Button>
        </Link>
      </div>
      <div>
        <Link href="/watch">
        <Button variant="outline">Watch Others</Button>
        </Link>
      </div>
      <div>
        <Link href="/about">
        <Button variant="outline">About Us</Button>
        </Link>
      </div>
    </nav>
  );
}
