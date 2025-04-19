// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/navlink";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FFF8F0]/95 backdrop-blur-md text-[#2F2F2F] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <NavLink to="/" className="text-2xl font-extrabold text-[#FF4E42] tracking-wide">
          🍽 Digital Diner
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive
                      ? "text-[#FF4E42] underline underline-offset-4"
                      : "text-[#2F2F2F] hover:text-[#FF4E42]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-20">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-[#FFF8F0] transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[500px] py-3" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-3 px-4 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#FF4E42] text-white"
                      : "hover:bg-[#FFD166]/80 text-[#2F2F2F]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
