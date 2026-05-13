"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";

/** Nút điều khiển — nền đặc (dark) để luôn nổi khi overlay trong suốt */
const glassControlBtn =
  "min-h-[44px] min-w-[44px] touch-manipulation rounded-full border border-white/30 bg-dark text-white shadow-[0_6px_24px_rgba(0,0,0,0.4)] backdrop-blur-sm transition hover:border-white/50 hover:bg-blue-dark hover:shadow-[0_8px_28px_rgba(0,0,0,0.45)] active:scale-[0.97]";

const PreviewSliderModal = () => {
  const {
    closePreviewModal,
    isModalPreviewOpen,
    previewImages,
    currentImageIndex,
  } = usePreviewSlider();

  const swiperRef = useRef<SwiperType | null>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const imagesToDisplay = previewImages;

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      closePreviewModal();
    }
  }, [pathname, closePreviewModal]);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    if (!isModalPreviewOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isModalPreviewOpen]);

  if (!isModalPreviewOpen) {
    return null;
  }

  return (
    <div
      className="preview-slider fixed inset-0 isolate z-999999 flex min-h-[100dvh] flex-col items-center justify-center overscroll-none"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh toàn màn hình"
    >
      <button
        type="button"
        onClick={() => closePreviewModal()}
        aria-label="Đóng xem ảnh"
        className={`absolute z-20 flex items-center justify-center rounded-full max-sm:right-[max(0.75rem,env(safe-area-inset-right))] max-sm:top-[max(0.75rem,env(safe-area-inset-top))] sm:right-6 sm:top-6 ${glassControlBtn}`}
      >
        <svg
          className="fill-current"
          width="36"
          height="36"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
            fill=""
          />
        </svg>
      </button>

      {imagesToDisplay.length > 1 && (
        <>
          <button
            type="button"
            className={`absolute z-20 rotate-180 cursor-pointer rounded-full max-sm:left-[max(0.75rem,env(safe-area-inset-left))] max-sm:right-auto max-sm:top-auto max-sm:translate-y-0 max-sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:left-6 sm:top-1/2 sm:-translate-y-1/2 ${glassControlBtn}`}
            onClick={handlePrev}
            aria-label="Ảnh trước"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5918 5.92548C14.9091 5.60817 15.4236 5.60817 15.7409 5.92548L22.2409 12.4255C22.5582 12.7428 22.5582 13.2572 22.2409 13.5745L15.7409 20.0745C15.4236 20.3918 14.9091 20.3918 14.5918 20.0745C14.2745 19.7572 14.2745 19.2428 14.5918 18.9255L19.7048 13.8125H4.33301C3.88428 13.8125 3.52051 13.4487 3.52051 13C3.52051 12.5513 3.88428 12.1875 4.33301 12.1875H19.7048L14.5918 7.07452C14.2745 6.75722 14.2745 6.24278 14.5918 5.92548Z"
                fill="#FDFDFD"
              />
            </svg>
          </button>

          <button
            type="button"
            className={`absolute z-20 cursor-pointer rounded-full max-sm:left-auto max-sm:right-[max(0.75rem,env(safe-area-inset-right))] max-sm:top-auto max-sm:translate-y-0 max-sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:top-1/2 sm:-translate-y-1/2 ${glassControlBtn}`}
            onClick={handleNext}
            aria-label="Ảnh sau"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5918 5.92548C14.9091 5.60817 15.4236 5.60817 15.7409 5.92548L22.2409 12.4255C22.5582 12.7428 22.5582 13.2572 22.2409 13.5745L15.7409 20.0745C15.4236 20.3918 14.9091 20.3918 14.5918 20.0745C14.2745 19.7572 14.2745 19.2428 14.5918 18.9255L19.7048 13.8125H4.33301C3.88428 13.8125 3.52051 13.4487 3.52051 13C3.52051 12.5513 3.88428 12.1875 4.33301 12.1875H19.7048L14.5918 7.07452C14.2745 6.75722 14.2745 6.24278 14.5918 5.92548Z"
                fill="#FDFDFD"
              />
            </svg>
          </button>
        </>
      )}

      <div className="relative z-10 flex h-full w-full max-h-[100dvh] max-w-[100vw] flex-1 items-center justify-center px-2 pt-14 pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:max-h-[92vh] sm:max-w-[96vw] sm:px-4 sm:pt-16 sm:pb-6">
        {imagesToDisplay.length === 0 ? (
          <p className="rounded-2xl border border-white/25 bg-dark px-5 py-4 text-base font-medium text-white shadow-lg">
            Không có ảnh xem trước.
          </p>
        ) : (
          <div className="max-h-full w-full max-w-[min(96vw,1200px)] overflow-visible bg-transparent p-0 max-sm:mx-auto max-sm:max-h-[min(calc(100dvh-5.5rem),100%)] max-sm:max-w-[calc(100vw-0.75rem)] sm:p-0">
            <Swiper
              key={imagesToDisplay.join("|")}
              className="h-full w-full !py-1 sm:!py-2 [&_.swiper-slide]:!opacity-100 [&_.swiper-wrapper]:items-center"
              slidesPerView={1}
              spaceBetween={12}
              threshold={8}
              initialSlide={currentImageIndex || 0}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {imagesToDisplay.map((image, index) => (
                <SwiperSlide
                  key={`${image}-${index}`}
                  className="!flex items-center justify-center"
                >
                  <div className="relative w-full overflow-visible bg-transparent max-sm:mx-auto max-sm:min-h-[min(52dvh,480px)] max-sm:h-[min(88dvh,calc(100dvh-8.5rem))] sm:h-[min(85vh,900px)] sm:max-h-[min(85vh,900px)]">
                    <Image
                      src={image}
                      alt={`Xem ảnh ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 96vw, 1200px"
                      priority={index === (currentImageIndex || 0)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewSliderModal;
