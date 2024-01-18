"use client";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { sideBarMenu } from "../../../config/site";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const isActivePath = "bg-violet-500 text-white transition-all translate-x-3";

  return (
    <>
      <div className='p-6 h-screen '>
        <div className='flex gap-4 items-center justify-center mb-6'>
          <Avatar
            src='https://i.pravatar.cc/150?u=a04258114e29026708c'
            size='lg'
          />
          <h1 className='text-2xl'>Admin</h1>
        </div>
        <ul>
          {sideBarMenu.map((menu) => (
            <li key={menu.title} className='cursor-pointer'>
              <span className='my-4'>{menu.title}</span>
              {menu.list.map((item) => (
                <div
                  key={item.title}
                  className={`flex gap-8 p-3 mt-3 rounded-xl hover:bg-violet-500 hover:translate-x-3 transition-all hover:text-white ${
                    pathname === item.path && isActivePath
                  }`}
                  onClick={() => router.push(item.path)}
                >
                  <Icon icon={item.icon} className='text-3xl' />
                  <span className='text-xl'>{item.title}</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
