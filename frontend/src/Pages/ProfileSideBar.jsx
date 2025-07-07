"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../Components/ui/sidebar";
import Dashboard from "./Dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHome,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import UserLayout from "../Components/Layout/UserLayout";
import { Outlet } from "react-router-dom";
import axios from "axios";

export function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Move localStorage calls inside useEffect to prevent re-renders
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userDetail, setUserDetails] = useState({
    name: '',
    avatar: ''
  });

  // Initialize user and token once
  useEffect(() => {
    const userFromStorage = localStorage.getItem("userInfo");
    const tokenFromStorage = localStorage.getItem("userToken");
    
    if (userFromStorage && tokenFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      setUser(parsedUser);
      setToken(tokenFromStorage);
      setUserDetails({
        name: parsedUser.name || '',
        avatar: parsedUser.avatar || ''
      });
    }
  }, []);

  // Fetch user details only when user and token are set
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('Fetching user details for:', user._id);
        console.log('Current user avatar:', user.avatar);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          { 
            headers: { Authorization: `Bearer ${token}` },
            params: { id: user._id }
          }
        );
        console.log('User details response:', res.data);
        console.log('New avatar from API:', res.data.avatar);
        setUserDetails(res.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Fallback to original user data if API fails
        console.log('Using fallback user data');
        setUserDetails({
          name: user.name,
          avatar: user.avatar
        });
      }
    };

    if (user && token && user._id) {
      fetchUserDetails();
    }
  }, [user, token]); // This will only run once when user and token are initially set

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
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  // const renderContent = () => {
  //   if (location.pathname === '/dashboard') return <Dashboard />;
  //   if (location.pathname === '/profile') return <UserLayout />;
  //   if (location.pathname === '/profile/account') return <Account />;
  //   if (location.pathname === '/profile/notifications') return <Notifications />;
  //   return <div>404</div>;
  // };

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    navigate("/");
  };
  if (!user) {
    return <div>Loading...</div>;
  }

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
            <div 
              className="cursor-pointer flex flex-1 flex-row overflow-x-hidden overflow-y-auto items-center gap-5"
              onClick={handleLogout}
            >
              <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
              <p className="text-sm text-neutral-700 dark:text-neutral-200">Logout</p>
            </div>
            <SidebarLink
              link={{
                label: userDetail.name || user?.name || 'User',
                href: "/dashboard/profile",
                icon: (
                  <img
                    src={userDetail.avatar || user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userDetail.name || user?.name || 'User') + '&background=3b82f6&color=fff&size=128'}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt="Avatar"
                    onError={(e) => {
                      console.log('Avatar failed to load:', e.target.src);
                      // Use a reliable fallback service
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userDetail.name || user?.name || 'User') + '&background=6b7280&color=fff&size=128';
                    }}
                  />
                ),
              }} 
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <img 
        src="https://static.vecteezy.com/system/resources/previews/018/930/715/non_2x/blogger-logo-blogger-icon-transparent-free-png.png" 
        className="h-7 w-7 shrink-0 rounded-full" 
        width={50}
        height={50} 
        alt="OpenScroll Logo" 
      />
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
      <img 
        src="https://static.vecteezy.com/system/resources/previews/018/930/715/non_2x/blogger-logo-blogger-icon-transparent-free-png.png" 
        className="h-7 w-7 shrink-0 rounded-full" 
        width={50}
        height={50} 
        alt="OpenScroll Logo" 
      />
    </a>
  );
};