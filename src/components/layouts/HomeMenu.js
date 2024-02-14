"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeaders from "./SectionHeaders";
import MenuItem from "../menu/MenuItem";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3)); //get the latest three
      });
    });
  }, []);

  return (
    <section className="">
      <div className="absolute left-0 top-0 text-left -z-10">
        <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
      </div>

      <div className="text-center">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
