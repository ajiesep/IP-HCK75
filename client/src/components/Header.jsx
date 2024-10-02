// import React, { useEffect, useState } from "react";
// import logo from "../assets/logo.png";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import userIcon from "../assets/user.png";
// import { ImSearch } from "react-icons/im";
// import { nav } from "../contents/nav";

// const Header = () => {
//   // const handleLogOut = () => {
//   //   localStorage.removeItem("token");
//   //   nav("/login");
//   // };
//   const location = useLocation();
//   const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
//   const [search, setSearch] = useState(removeSpace);
//   const navigate = useNavigate();

//   //   console.log(removeSpace, "......");
//   useEffect(() => {
//     if (search) {
//       navigate(`/search?q=${search}`);
//     }
//   }, [search]);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <>
//       <header className="fixed top-0 z-40 w-full h-16 bg-opacity-75 bg-zinc-800">
//         <div className="container flex items-center h-full px-2 mx-auto">
//           <Link to={"/"}>
//             <img src={logo} alt="logo" width={120} />
//           </Link>
//           <nav className="items-center hidden gap-1 ml-4 lg:flex">
//             {nav.map((n) => {
//               return (
//                 <div key={n + ""}>
//                   <NavLink
//                     key={n.label}
//                     to={n.href}
//                     className={({ isActive }) =>
//                       `px-2 hover:text-neutral-100 ${
//                         isActive && "text-neutral-100"
//                       }`
//                     }
//                   >
//                     {n.label}
//                   </NavLink>
//                 </div>
//               );
//             })}
//           </nav>
//           <div className="flex items-center gap-5 ml-auto">
//             <form className="flex items-center gap-0" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Search here..."
//                 className="hidden px-0 py-0 bg-transparent border-none outline-none lg:block"
//                 onChange={(e) => setSearch(e.target.value)}
//                 value={search}
//               />
//               <button className="text-xl text-zinc-100">
//                 <ImSearch />
//               </button>
//             </form>

//             <div className="w-8 h-8 overflow-hidden transition-all rounded-full cursor-pointer active:scale-75">
//               <img src={userIcon} alt="userIcon" width="w-full h-full" />
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { navigation } from "../contents/Navigation";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 z-50 w-full h-20 shadow-lg bg-gradient-to-r from-neutral-700 to-neutral-900 bg-opacity-90">
      <div className="container flex items-center justify-between h-full px-3 mx-auto">
        {/* Logo with subtle hover effect */}
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="h-auto transition-transform transform w-28 hover:scale-105"
            width={120}
          />
        </Link>
        {/* Navigation Menu */}
        <nav className="items-center hidden gap-1 ml-4 lg:flex">
          {navigation.map((n) => {
            // return (
            //   <div key={n.label}>
            //     {" "}
            //     {/* Ensure each key is unique */}
            //     <NavLink
            //       to={n.href}
            //       className={({ isActive }) =>
            //         `px-2 transition-colors hover:text-neutral-100 ${
            //           isActive ? "text-neutral-100" : "text-neutral-300"
            //         }`
            //       }
            //     >
            //       {n.label}
            //     </NavLink>
            //   </div>
            // );
          })}
        </nav>

        {/* User Icon */}
        <div className="flex items-center gap-5 ml-auto">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here.."
              className="hidden px-4 py-1 bg-transparent border-none outline-none lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearch />
            </button>
          </form>
          <div className="w-10 h-10 ml-auto overflow-hidden transition-all rounded-full cursor-pointer active:scale-50">
            <img
              src={userIcon}
              alt="User Icon"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
