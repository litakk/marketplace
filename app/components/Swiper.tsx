"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

const Hero: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="relative">
      {swiperReady && (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-[50vh] mt-5 rounded-xl cursor-grab lg:h-[70vh]"
        >
          <SwiperSlide className="relative">
            <div className="absolute z-10 bg-[#0000003d] w-full h-full flex flex-col justify-end lg:pl-10 lg:pb-25 p-4 pb-10 ">
              <div className="text-start">
                <h2 className="font-extrabold lg:font-black text-xl lg:text-[40px] text-white lexend_font">
                  НОВАЯ КОЛЛЕКЦИЯ УЖЕ ЗДЕСЬ
                </h2>
                <p className="text-sm font-medium lg:text-[18px] text-white lexend_font lg:font-normal leading-4.5  lg:leading-6 mt-1 lg:mt-2">
                  Стиль, вдохновлённый настоящим. Мужская и женская одежда на
                  каждый день и особые случаи. <br />
                  Почувствуй себя в центре внимания.
                </p>
                <button className="bg-[#5EEB42] text-sm lg:text-[16px] text-black font-bold rounded-3xl border-0 lg:py-3 lg:px-5 cursor-pointer btn_animate transition-all lg:mt-7 mt-4 p-3">
                  Смотреть коллекцию
                </button>
              </div>
            </div>
            <img
              className="h-full w-full object-cover"
              src="/examplePicture1.jpg"
              alt="go-banner"
            />
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="absolute z-10 bg-[#0000003d] w-full h-full flex flex-col justify-end lg:pl-10 lg:pb-25 p-4 pb-10 ">
              <div className="text-start">
                <h2 className="font-extrabold lg:font-black text-xl lg:text-[40px] text-white lexend_font">
                  БАЗА, КОТОРАЯ РЕШАЕТ ВСЁ
                </h2>
                <p className="text-sm font-medium lg:text-[18px] text-white lexend_font lg:font-normal leading-4.5  lg:leading-6 mt-1 lg:mt-2">
                  Футболки, джинсы, худи и не только — всё, что нужно каждый
                  день. <br />
                  Комфорт, стиль и качество без компромиссов.
                  <br />
                  Погрузись в мир подводной красоты
                </p>
                <button className="bg-[#5EEB42] text-sm lg:text-[16px] text-black font-bold rounded-3xl border-0 lg:py-3 lg:px-5 cursor-pointer btn_animate transition-all lg:mt-7 mt-4 p-3">
                  Перейти в базу
                </button>
              </div>
            </div>
            <img
              className="h-full w-full object-cover"
              src="/examplePicture2.jpg"
              alt="fish_banner"
            />
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="absolute z-10 bg-[#0000003d] w-full h-full flex flex-col justify-end lg:pl-10 lg:pb-25 p-4 pb-10 ">
              <div className="text-start">
                <h2 className="font-extrabold lg:font-black text-xl lg:text-[40px] text-white lexend_font">
                  СТИЛЬ В ЛЮБУЮ ПОГОДУ
                </h2>
                <p className="text-sm font-medium lg:text-[18px] text-white lexend_font lg:font-normal leading-4.5  lg:leading-6 mt-1 lg:mt-2">
                  Куртки, пальто и жилеты — тепло и тренд в каждой детали.
                  <br />
                  Защита от холода, созданная со вкусом.
                </p>
                <button className="bg-[#5EEB42] text-sm lg:text-[16px] text-black font-bold rounded-3xl border-0 lg:py-3 lg:px-5 cursor-pointer btn_animate transition-all lg:mt-7 mt-4 p-3">
                  Выбрать верх
                </button>
              </div>
            </div>
            <img
              className="h-full w-full object-cover"
              src="/examplePicture3.jpg"
              alt="med_dog.jpg"
            />
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="absolute z-10 bg-[#0000003d] w-full h-full flex flex-col justify-end lg:pl-10 lg:pb-25 p-4 pb-10 ">
              <div className="text-start">
                <h2 className="font-extrabold lg:font-black text-xl lg:text-[40px] text-white lexend_font">
                  ТО, ЧТО ДОПОЛНЯЕТ
                </h2>
                <p className="text-sm font-medium lg:text-[18px] text-white lexend_font lg:font-normal leading-4.5  lg:leading-6 mt-1 lg:mt-2">
                  Сумки, очки, головные уборы — детали, которые делают образ.
                  <br />
                  Создай стиль до мелочей.
                </p>
                <button className="bg-[#5EEB42] text-sm lg:text-[16px] text-black font-bold rounded-3xl border-0 lg:py-3 lg:px-5 cursor-pointer btn_animate transition-all lg:mt-7 mt-4 p-3">
                  К аксессуарам
                </button>
              </div>
            </div>
            <img
              className="h-full w-full object-cover"
              src="/examplePicture4.jpg"
              alt="play_dog"
            />
          </SwiperSlide>

          <SwiperSlide className="relative">
            <div className="absolute z-10 bg-[#0000003d] w-full h-full flex flex-col justify-end lg:pl-10 lg:pb-25 p-4 pb-10 ">
              <div className="text-start">
                <h2 className="font-extrabold lg:font-black text-xl lg:text-[40px] text-white lexend_font">
                  СКИДКИ ДО -50%
                </h2>
                <p className="text-sm font-medium lg:text-[18px] text-white lexend_font lg:font-normal leading-4.5  lg:leading-6 mt-1 lg:mt-2">
                  Лучшее время обновить гардероб — сезонная распродажа уже
                  началась! <br />
                  Лови стиль по выгодным ценам.
                </p>
                <button className="bg-[#5EEB42] text-sm lg:text-[16px] text-black font-bold rounded-3xl border-0 lg:py-3 lg:px-5 cursor-pointer btn_animate transition-all lg:mt-7 mt-4 p-3">
                  Смотреть скидки
                </button>
              </div>
            </div>
            <img
              className="h-full w-full object-cover"
              src="/gfgda.jpg"
              alt="sale_dog"
            />
          </SwiperSlide>
        </Swiper>
      )}

      {/* Кастомные кнопки */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20 flex justify-between w-full px-2 pointer-events-none">
        <button
          ref={prevRef}
          className="hidden lg:flex bg-[#F2590D] rotate-180 w-8 h-8 rounded-full  justify-center items-center cursor-pointer hover:bg-[#f2590da6] pointer-events-auto"
        >
          <FaArrowRight color="white" />
        </button>
        <button
          ref={nextRef}
          className="hidden lg:flex bg-[#F2590D] w-8 h-8 rounded-full  justify-center items-center cursor-pointer hover:bg-[#f2590da6] pointer-events-auto"
        >
          <FaArrowRight color="white" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
