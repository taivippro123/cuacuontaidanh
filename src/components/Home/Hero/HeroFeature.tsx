import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Chính hãng",
    description: "Sản phẩm rõ nguồn gốc",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "Bảo hành dài hạn",
    description: "Chính sách minh bạch",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "Thi công nhanh",
    description: "Khảo sát và lắp đặt tận nơi",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "Hỗ trợ 24/7",
    description: "Tư vấn kỹ thuật mọi lúc",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="mt-8 grid gap-4 rounded-xl bg-white p-4 shadow-lg sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-3" key={key}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1FB]">
              <Image src={item.img} alt="icons" width={24} height={24} />
            </div>

            <div>
              <h3 className="font-semibold text-base text-[#0F2747]">{item.title}</h3>
              <p className="text-xs text-[#5D6C84]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
