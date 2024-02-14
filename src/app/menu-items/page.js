"use client";
import UseProfile from "@/components/UseProfile";
import UserTabs from "@/components/layouts/UserTabs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { data, loading } = UseProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "loading...";
  }
  if (!data.admin) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          Create a new item
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  {item.image ? (
                    <Image
                      className="rounded-md"
                      src={item.image}
                      alt={""}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                      No image
                    </div>
                  )}
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
