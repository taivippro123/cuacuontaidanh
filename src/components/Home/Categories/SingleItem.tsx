import { Category } from "@/utils/dataFetcher";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SingleItem = ({ item }: { item: Category }) => {
  const href = item.slug
    ? `/shop-with-sidebar?category=${encodeURIComponent(item.slug)}`
    : "/shop-with-sidebar";

  return (
    <Link
      href={href}
      className="group swiper-no-swiping flex flex-col items-center"
    >
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4">
        {item.img && (
          <Image src={item.img} alt={item.title} width={82} height={62} />
        )}
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;
