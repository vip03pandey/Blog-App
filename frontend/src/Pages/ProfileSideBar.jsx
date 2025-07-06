"use client";
import React, { use, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../Components/ui/sidebar";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import UserLayout from "../Components/Layout/UserLayout";
import { Outlet } from "react-router-dom";

export function Profile() {
  const userFromStorage = localStorage.getItem("userInfo");
  const user = userFromStorage ? JSON.parse(userFromStorage) : null; 
  const navigate=useNavigate() 
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const renderContent = () => {
    if (location.pathname === '/dashboard') return <Dashboard />;
    if (location.pathname === '/profile') return <UserLayout />;
    if (location.pathname === '/profile/account') return <Account />;
    if (location.pathname === '/profile/notifications') return <Notifications />;
    return <div>404</div>;
  };
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-screen h-screen flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 mt-0",
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
         
          <div>
          <div className="cursor-pointer flex flex-1 flex-row overflow-x-hidden overflow-y-auto items-center gap-5"
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  localStorage.removeItem("userToken");
                  navigate("/");
                }}>
          <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
          <p className="text-sm text-neutral-700 dark:text-neutral-200">Logout</p>
          </div>
            <SidebarLink
              link={{
                label: user.name,
                href: "/dashboard/profile",
                icon: (
                  <img
                    src={user.avatar}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto p-4">
          <Outlet></Outlet>
</div>

    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <img src="https://static.vecteezy.com/system/resources/previews/018/930/715/non_2x/blogger-logo-blogger-icon-transparent-free-png.png" lassName="h-7 w-7 shrink-0 rounded-full" width={50}
                    height={50} alt="" srcset="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        OpenScroll
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
     <img src="https://static.vecteezy.com/system/resources/previews/018/930/715/non_2x/blogger-logo-blogger-icon-transparent-free-png.png" className="h-7 w-7 shrink-0 rounded-full" width={50}
    height={50} alt="" srcset="" />
    </a>
  );
};
