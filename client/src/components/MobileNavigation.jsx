import React from "react";
import { mobileNavigation } from "../contents/Navigation";
import { NavLink } from "react-router-dom";

function MobileNavigation() {
  return (
    <section className="fixed bottom-0 z-40 w-full lg:hidden h-14 bg-zinc-800 bg-opacity-70 backdrop-blur-2xl">
      <div className="flex items-center justify-between h-full text-neutral-400">
        {mobileNavigation.map((nav, index) => {
          return (
            <NavLink
              key={nav.label + "mobilenavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && "text-white"
                }`
              }
            >
              <div className="text-2xl">{nav.icons}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default MobileNavigation;
