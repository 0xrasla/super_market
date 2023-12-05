import { useState } from "react";
import { Icon } from "@iconify/react";

type Link = {
  label: string;
  link: string;
  icon?: JSX.Element;
  onClick?: () => void;
  subLinks?: Link[];
  isExpanded?: boolean;
};

import { Collapse } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const handleLogout = () => {
    console.log("Logout");
  };

  const navigate = useNavigate();
  const activelink = useLocation().pathname.split("/").pop();

  const [Links, setLinks] = useState<Link[]>([
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: (
        <Icon
          icon="fluent:data-pie-24-filled"
          className="w-5 h-5 transition duration-75"
        />
      ),
    },
    {
      label: "Master",
      link: "/master",
      icon: (
        <Icon
          icon="uis:align-left"
          rotate={3}
          className="w-5 h-5 transition duration-75"
        />
      ),
      subLinks: [
        {
          label: "Warehouse",
          link: "/warehouse",
          icon: (
            <Icon
              icon="mynaui:store"
              className="w-5 h-5 transition duration-75"
            />
          ),
        },
        {
          label: "Category",
          link: "/category",
          icon: (
            <Icon
              icon="iconamoon:category"
              className="w-5 h-5 transition duration-75"
            />
          ),
        },
        {
          label: "Vendor",
          link: "/vendor",
          icon: (
            <Icon
              icon="ion:cube-outline"
              className="w-5 h-5 transition duration-75"
            />
          ),
        },
      ],
    },
    {
      label: "Products",
      link: "/products",
      icon: (
        <Icon
          icon="ion:bag-handle"
          className="w-5 h-5 transition duration-75"
        />
      ),
    },
    {
      link: "/employees",
      label: "Employees",
      icon: (
        <Icon
          icon="mdi:graph-line"
          className="w-5 h-5 transition duration-75"
        />
      ),
    },
    {
      link: "/customer",
      label: "Customer",
      icon: (
        <Icon
          icon="ri:message-2-line"
          className="w-5 h-5 transition duration-75"
        />
      ),
    },
    {
      link: "/shops",
      label: "Shops",
      icon: (
        <Icon
          icon="solar:shop-2-broken"
          className="w-5 h-5 transition duration-75"
        />
      ),
    },
    {
      link: "/settings",
      label: "Settings",
      icon: (
        <Icon
          icon="material-symbols:settings-outline"
          className="w-5 h-5 transition duration-75"
        />
      ),
    },
  ]);

  const activelabelclass =
    "bg-admin-dominant rounded-lg text-white transition-all duration-[0.4s]";

  return (
    <div className="h-screen min-w-[300px] overflow-y-auto text-admin-textdominant text-lg bg-gray-100 font-poppins">
      <div className="flex justify-center items-center gap-2 p-4">
        <img src="/icons/adminlogo.svg" alt="" className="w-12" />
        <h2 className="text-2xl text-black capitalize m-4 font-bold">
          Supermarket
        </h2>
      </div>
      <ul className="space-y-2 m-0 px-4">
        {Links.map((link, index) => (
          <li key={index} className="cursor-pointer list-none">
            <p
              className={`flex justify-between items-center ${
                link.label.toLowerCase() === activelink ? activelabelclass : ""
              }`}
              onClick={() => {
                if (link.subLinks) {
                  link.isExpanded = !link.isExpanded;
                  setLinks([...Links]);
                } else {
                  navigate(link.link);
                }
              }}
            >
              <span className={`flex gap-2 p-2 items-center`}>
                {link.icon}
                {link.label}
              </span>

              {link.subLinks ? (
                <Icon
                  icon="material-symbols:keyboard-arrow-up"
                  className="w-5 h-5 transition duration-75"
                  rotate={link.isExpanded ? 0 : 2}
                />
              ) : null}
            </p>

            <Collapse
              in={link.isExpanded || false}
              transitionDuration={200}
              transitionTimingFunction="linear"
            >
              {link && link.subLinks && (
                <ul className="space-y-4 ml-6 mt-4">
                  {link.subLinks.map((subLink) => (
                    <li className="list-none" key={subLink.label}>
                      <span
                        className={`flex gap-2 p-2 items-center ${
                          subLink.label.toLowerCase() === activelink
                            ? activelabelclass
                            : ""
                        }`}
                        onClick={() => {
                          navigate(subLink.link);
                        }}
                      >
                        {subLink.icon}
                        {subLink.label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Collapse>
          </li>
        ))}
      </ul>
    </div>
  );
}
