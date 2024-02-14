"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserTabs from "@/components/layouts/UserTabs";
import UseProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import MenuItemForm from "@/components/layouts/MenuItemForm";
import { useRouter } from "next/navigation";

export default function EditMenuItemPage() {
  const { data, loading } = UseProfile();
  const [menuItem, setMenuItem] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  if (loading) {
    return "loading...";
  }
  if (!data.admin) {
    return "not an admin";
  }

  async function handleSave(e, data) {
    e.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
    router.push("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link className="button" href={"/menu-items"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Show all items
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleSave} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </section>
  );
}
