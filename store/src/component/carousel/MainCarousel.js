import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useTranslation from "next-translate/useTranslation";

import { sliderData } from "@utils/data";

const MainCarousel = () => {
  const { t } = useTranslation();
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData.map((item, i) => (
          <SwiperSlide
            className="h-full relative rounded-lg overflow-hidden"
            key={i + 1}
          >
            <div className="text-sm text-gray-600 hover:text-emerald-dark">
              <Image
                src={item.image}
                alt={item.title}
                width={950}
                height={390}
                className="w-full h-[440px] object-cover"
                priority={i === 0}
              />
            </div>
            <div className="absolute top-0 left-0 z-10 p-r-16 flex-col flex w-full h-full place-items-start justify-center">
              <div className="pl-4 pr-12 sm:pl-10 sm:pr-16 w-10/12 lg:w-8/12 xl:w-7/12">
                <h1 className="mb-2 font-serif text-xl sm:text-lg md:text-2xl line-clamp-1 md:line-clamp-none  lg:line-clamp-none  lg:text-3xl font-bold text-gray-800">
                  {t(`common:${item.title}`)}
                </h1>
                <p className="text-base leading-6 text-gray-600 font-sans line-clamp-1  md:line-clamp-none lg:line-clamp-none">
                  {t(`common:${item.info}`)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default React.memo(MainCarousel);
