import React from "react";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-gradient-to-br from-[#0F2747] via-[#173B68] to-[#2C5B91]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="relative rounded-2xl bg-white/95 p-6 shadow-2xl sm:p-9 xl:p-10">
            <p className="mb-3 inline-flex rounded-full bg-[#F06A1A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F06A1A]">
              CỬA CUỐN CAO CẤP
            </p>

            <h1 className="mb-4 text-2xl font-semibold leading-tight text-[#0F2747] sm:text-4xl xl:text-[46px]">
              AN TOÀN - HIỆN ĐẠI
            </h1>

            <p className="max-w-[580px] text-base leading-7 text-[#3C4D67] sm:text-lg sm:leading-7">
              Thi công cửa cuốn, cửa kéo, motor, bình lưu điện chính hãng tại
              TP.HCM.
            </p>

            <div className="mt-6 grid max-w-[430px] grid-cols-2 gap-3">
              <Link
                href="/san-pham"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#F06A1A] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#d95f16] sm:px-6 sm:py-3 sm:text-[15px]"
              >
                Xem sản phẩm
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-[#0F2747] px-4 py-3 text-sm font-medium text-[#0F2747] transition hover:bg-[#0F2747] hover:text-white sm:px-6 sm:py-3 sm:text-[15px]"
              >
                Liên hệ tư vấn
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2.5 text-[clamp(11px,1.05vw,13px)] font-semibold lg:grid-cols-4 lg:gap-2.5">
              <span className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#EAF1FB] px-2 text-center text-[#173B68]">
                Bảo hành chính hãng
              </span>
              <span className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#EAF1FB] px-2 text-center text-[#173B68]">
                Lắp đặt tận nơi
              </span>
              <span className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#EAF1FB] px-2 text-center text-[#173B68]">
                Hỗ trợ 24/7
              </span>
              <span className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[#EAF1FB] px-2 text-center text-[#173B68]">
                Tư vấn đúng nhu cầu
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-sm sm:p-3">
            <div className="relative overflow-hidden rounded-xl bg-[#f2f4f8]">
              <Image
                src="/images/hero/cuacuon.png"
                alt="Cua cuon nha pho va showroom"
                width={720}
                height={520}
                className="h-[290px] w-full object-cover sm:h-[420px]"
                priority
              />

              <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-3 text-[#0F2747] shadow-lg">
                <p className="text-sm font-semibold">Bảo hành chính hãng</p>
                <p className="text-xs text-[#4A5972]">Thi công nhanh tại TP.HCM</p>
              </div>

              <div className="absolute right-4 top-4 rounded-lg bg-white/90 px-4 py-3 text-[#0F2747] shadow-lg">
                <p className="text-sm font-semibold">Hỗ trợ 24/7</p>
                <p className="text-xs text-[#4A5972]">Lắp đặt tận nơi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
