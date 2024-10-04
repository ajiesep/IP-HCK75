import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contents/Navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <header className="fixed top-0 z-40 w-full h-16 bg-black bg-opacity-50">
      <div className="container flex items-center h-full px-3 mx-auto">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="items-center hidden gap-1 ml-5 lg:flex">
          {navigation.map((nav, index) => {
            return (
              <div>
                <NavLink
                  key={nav.label + "header" + index}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 ml-auto">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="hidden px-4 py-1 bg-transparent border-none outline-none lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
            <Link to="/login" onClick={handleLogout}>
              <button className="font-semibold text-[15px] text-gray-600 hover:text-red-500 transition-all duration-200">
                Log out
              </button>
            </Link>
          </form>
          <div className="w-8 h-8 overflow-hidden transition-all rounded-full cursor-pointer active:scale-50">
            <Link to="/profile">
              <img src={userIcon} width="w-ful h-full" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
