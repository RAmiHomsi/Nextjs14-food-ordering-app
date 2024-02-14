"use client";
import UseProfile from "@/components/UseProfile";
import SuccessBox from "@/components/layouts/SuccessBox";
import UserTabs from "@/components/layouts/UserTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { data, loading } = UseProfile();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    let timer;
    if (isSaved) {
      timer = setTimeout(() => {
        setIsSaved(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [, isSaved]);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  if (loading) {
    return "loading...";
  }
  if (!data.admin) {
    return "not an admin";
  }

  async function handleNewCategory(e) {
    e.preventDefault();
    const data = { name: newCategoryName };
    if (editedCategory) {
      data._id = editedCategory._id;
    }
    const res = await fetch("/api/categories", {
      method: editedCategory ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setNewCategoryName("");
    if (res.ok) {
      setIsSaved(true);
    }
    setEditedCategory(false);
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true}></UserTabs>
      {isSaved && (
        <SuccessBox>
          {editedCategory ? "Successfully updated" : "Successfully created"}
        </SuccessBox>
      )}
      <form className="mt-8" onSubmit={handleNewCategory}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <lable className="mt-8 text-sm text-gray-500">
              {editedCategory ? "Update current category" : "New category name"}
            </lable>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            ></input>
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(false);
                setNewCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setNewCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(c._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
