import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="fixed bottom-0 z-40 w-full lg:hidden h-14 bg-neutral-600 bg-opacity-60">
      <div className="flex items-center justify-between h-full text-neutral-400">
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className="text-sm">Created By Films Asik-asik</p>
    </footer>
  );
}

export default Footer;
