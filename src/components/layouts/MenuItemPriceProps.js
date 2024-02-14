import React, { useState } from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addProps() {
    setProps((oldprops) => {
      return [...oldprops, { name: "", price: 0 }];
    });
  }
  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevprops) => {
      const newprops = [...prevprops];
      newprops[index][prop] = newValue;
      return newprops;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <>
      <label className="mt-8 text-sm text-gray-500">{name}</label>
      <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex p-1 border-0 justify-start"
          type="button"
        >
          {isOpen && (
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
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
          {!isOpen && (
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
          <span>{name}</span>
          <span>({props?.length})</span>
        </button>
        <div className={isOpen ? "block" : "hidden"}>
          {props?.length > 0 &&
            props.map((size, index) => (
              <div key={index} className="flex items-end gap-2">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Size name"
                    value={size.name}
                    onChange={(e) => editProp(e, index, "name")}
                  />
                </div>
                <div>
                  <label>Extra price</label>
                  <input
                    type="text"
                    placeholder="Extra price"
                    value={size.price}
                    onChange={(e) => editProp(e, index, "price")}
                  />
                </div>
                <div>
                  <button
                    className="bg-white mb-2 px-2"
                    type="button"
                    onClick={() => removeProp(index)}
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          <button type="button" onClick={addProps} className="bg-white">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>{addLabel}</span>
          </button>
        </div>
      </div>
    </>
  );
}
