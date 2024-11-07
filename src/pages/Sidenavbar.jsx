import React, { useState } from "react";
import { FaCloudUploadAlt, FaImages, FaCog, FaLock, FaArrowUp, FaUser, FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/UserSlice";
import { toast } from "react-toastify";

const SideNavbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
    navigate(item);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout(null));
    localStorage.removeItem("User");
    toast.success("You are Logged out");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-20 md:hidden">
        <button onClick={toggleMenu} className={`text-white text-2xl ${isOpen && "hidden"}`}>
          <FaBars />
        </button>
      </div>
      <div
        className={`bg-custom-blue-1 h-screen md:w-1/5 w-3/4 fixed md:relative z-10 transition-transform transform font-serif text-lg ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        } md:translate-x-0 flex flex-col justify-between`}
      >
        <nav className="h-full flex flex-col justify-between">
          <div>
            {!user ? (
              <ul className="flex flex-col">
                <NavItem
                  icon={<FaLock />}
                  to="/signup"
                  label="Signup"
                  active={activeItem === "/signup" || location.pathname === "/signup"}
                  onClick={() => handleClick("/signup")}
                />
                <NavItem
                  icon={<FaUser />}
                  to="/login"
                  label="Login"
                  active={activeItem === "/login" || location.pathname === "/login"}
                  onClick={() => handleClick("/login")}
                />
                <NavItem
                  icon={<FaCloudUploadAlt />}
                  to="/upload"
                  label="UPLOAD"
                  active={activeItem === "/upload" || location.pathname === "/upload"}
                  onClick={() => handleClick("/upload")}
                />
              </ul>
            ) : (
              <>
                <div className="flex justify-center items-center mt-5 bg-slate-300 w-full h-12 rounded-xl font-bold">
                  {user.username}'s profile
                </div>
                <ul className="flex flex-col mt-9">
                  <NavItem
                    icon={<FaCloudUploadAlt />}
                    to="/upload"
                    label="UPLOAD"
                    active={activeItem === "/upload" || location.pathname === "/upload"}
                    onClick={() => handleClick("/upload")}
                  />
                  <NavItem
                    icon={<FaImages />}
                    to="/gallery"
                    label="My GALLERY"
                    active={activeItem === "/gallery" || location.pathname === "/gallery"}
                    onClick={() => handleClick("/gallery")}
                  />
                </ul>
              </>
            )}
          </div>
          {user && (
            <div>
              <ul className="flex flex-col">
                <NavItem
                  icon={<FaCog />}
                  to="/settings"
                  label="SETTINGS"
                  active={activeItem === "/settings" || location.pathname === "/settings"}
                  onClick={() => handleClick("/settings")}
                />
                <NavItem
                  icon={<FaArrowUp />}
                  to="/logout"
                  label="Logout"
                  active={activeItem === "/logout" || location.pathname === "/logout"}
                  onClick={() => {
                    handleClick("/logout");
                    handleLogout();
                  }}
                />
              </ul>
            </div>
          )}
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

const NavItem = ({ icon, label, to, active, onClick }) => {
  return (
    <li
      className={`flex items-center p-4 ${
        active ? "bg-slate-700" : "hover:bg-slate-500"
      } cursor-pointer text-white`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </li>
  );
};

export default SideNavbar;
