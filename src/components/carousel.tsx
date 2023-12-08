"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { cn } from "~/lib/utils";
import { useState } from "react";

type Props = {
  imageURLs: string[];
  sizes?: string;
  className?: string;
};

export function Carousel({ imageURLs, className, sizes }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={50}
      navigation
      pagination={{
        clickable: true,
      }}
      className={cn("rounded-md", className)}
      modules={[Navigation, Pagination]}
      onActiveIndexChange={({ activeIndex }) => setActiveIndex(activeIndex)}
    >
      {imageURLs.map((imageURL, index) => (
        <SwiperSlide key={imageURL} className="relative aspect-video w-full">
          <Image
            src={imageURL}
            alt="image"
            fill
            className="absolute inset-0 aspect-video cursor-pointer"
            sizes={
              sizes ??
              "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            priority={activeIndex === index}
            onClick={() => window.open(imageURL, "_blank")}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
