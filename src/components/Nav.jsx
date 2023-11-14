import React from "react";
import { navSections } from "../constants";
import UserLoader from "./UserLoader";
import { BiDoorOpen } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-start p-2 py-4">
      <div>
        {/* Logo */}
        <img className="w-14 mb-4" src="x-logo.webp" alt="x-logo" />
        {/* Navbar */}
        {navSections.map((item) => (
          <div
            key={item.title}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-gray-400"
          >
            {item.icon} <span className="hidden md:block">{item.title}</span>
          </div>
        ))}
      </div>
      {/* User Info */}
      <div>
        {!user ? (
          <UserLoader />
        ) : (
          <div className="flex flex-col gap-5">
            <img
              className="w-12 h-12 rounded-full"
              src={user?.photoURL}
              alt="user-photo"
            />
            <p>{user.displayName}</p>
            <button
              onClick={() => signOut(auth)}
              className="flex bg-gray-700 rounded w-fit p-1 px-3 items-center justify-center text-2xl md:text-xl"
            >
              <BiDoorOpen />
              <span className="hidden md:block">Exit</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
