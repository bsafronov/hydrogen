"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

type Props = {
  imageURLs: string[];
};

export function Carousel({ imageURLs }: Props) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={50}
      navigation
      pagination={{
        clickable: true,
      }}
      className="rounded-md"
      modules={[Navigation, Pagination]}
    >
      {imageURLs.map((imageURL) => (
        <SwiperSlide key={imageURL} className="relative aspect-video w-full">
          <Image
            src={imageURL}
            alt="image"
            fill
            className="absolute inset-0 aspect-video cursor-pointer"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onClick={() => window.open(imageURL, "_blank")}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
