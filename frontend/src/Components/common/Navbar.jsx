"use client";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar";

import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Read Articles",
      link: "/article",
    },
    {
      name: "Write Articles",
      link: "/write-article",
    },
    {
      name: "Pricing",
      link: "/",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Parse user if present
  const userFromStorage = localStorage.getItem("userInfo");
  const user = userFromStorage ? JSON.parse(userFromStorage) : null;  

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems className="" items={navItems} />
          <div className="flex items-center gap-4">
            {user ? (
              <NavbarButton
                onClick={() => navigate("/dashboard")}
                variant="primary"
                className="!bg-black !text-white"
              >
              {user.name.split(' ')[0]}
              </NavbarButton>
            ) : (
              <NavbarButton
                onClick={() => navigate("/login")}
                variant="primary"
                className="!bg-black !text-white"
              >
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {user ? (
                <NavbarButton
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  {user.name}
                </NavbarButton>
              ) : (
                <NavbarButton
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
