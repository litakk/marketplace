"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper mt-[150px] mb-[150px]"
      >
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-brioni-icon-download-in-svg-png-gif-file-formats--suits-logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202544.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-burton-icon-download-in-svg-png-gif-file-formats--logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202552.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-avirex-icon-download-in-svg-png-gif-file-formats--usa-logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202725.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-christian-icon-download-in-svg-png-gif-file-formats--dior-logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202555.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-adidas-icon-download-in-svg-png-gif-file-formats--logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202715.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-calvin-icon-download-in-svg-png-gif-file-formats--klein-logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202539.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-champion-icon-download-in-svg-png-gif-file-formats--logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202541.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-converse-icon-download-in-svg-png-gif-file-formats--logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202556.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-gucci-icon-download-in-svg-png-gif-file-formats--logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202609.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-dolce-icon-download-in-svg-png-gif-file-formats--gabbana-logo-brand-company-fashion-and-clothing-logos-pack-accessories-icons-202574.png?f=webp&w=256"
            alt=""
            className="w-32 h-32 object-contain"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
