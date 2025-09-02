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
          spaceBetween={0}
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
          className="mySwiper h-[60vh] lg:h-[75vh] mt-6 cursor-grab"
        >
          <SwiperSlide className="relative">
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col justify-end lg:pl-16 p-6 pb-12">
              <div className="text-start max-w-[680px]">
                <h2 className="font-medium tracking-[0.22em] uppercase text-white text-lg lg:text-[34px]">
                  НОВАЯ КОЛЛЕКЦИЯ УЖЕ ЗДЕСЬ
                </h2>
                <p className="text-[12px] lg:text-[16px] text-white/80 leading-5 lg:leading-7 mt-2">
                  Стиль, вдохновлённый настоящим. Мужская и женская одежда на
                  каждый день и особые случаи. <br />
                  Почувствуй себя в центре внимания.
                </p>
                <button className="inline-flex items-center rounded-full bg-white/90 text-black hover:bg-white px-6 py-3 mt-5 text-[12px] tracking-[0.18em] uppercase transition-colors">
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
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col justify-end lg:pl-16 p-6 pb-12">
              <div className="text-start max-w-[680px]">
                <h2 className="font-medium tracking-[0.22em] uppercase text-white text-lg lg:text-[34px]">
                  БАЗА, КОТОРАЯ РЕШАЕТ ВСЁ
                </h2>
                <p className="text-[12px] lg:text-[16px] text-white/80 leading-5 lg:leading-7 mt-2">
                  Футболки, джинсы, худи и не только — всё, что нужно каждый
                  день. <br />
                  Комфорт, стиль и качество без компромиссов.
                  <br />
                  Погрузись в мир подводной красоты
                </p>
                <button className="inline-flex items-center rounded-full bg-white/90 text-black hover:bg-white px-6 py-3 mt-5 text-[12px] tracking-[0.18em] uppercase transition-colors">
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
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col justify-end lg:pl-16 p-6 pb-12">
              <div className="text-start max-w-[680px]">
                <h2 className="font-medium tracking-[0.22em] uppercase text-white text-lg lg:text-[34px]">
                  СТИЛЬ В ЛЮБУЮ ПОГОДУ
                </h2>
                <p className="text-[12px] lg:text-[16px] text-white/80 leading-5 lg:leading-7 mt-2">
                  Куртки, пальто и жилеты — тепло и тренд в каждой детали.
                  <br />
                  Защита от холода, созданная со вкусом.
                </p>
                <button className="inline-flex items-center rounded-full bg-white/90 text-black hover:bg-white px-6 py-3 mt-5 text-[12px] tracking-[0.18em] uppercase transition-colors">
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
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col justify-end lg:pl-16 p-6 pb-12">
              <div className="text-start max-w-[680px]">
                <h2 className="font-medium tracking-[0.22em] uppercase text-white text-lg lg:text-[34px]">
                  ТО, ЧТО ДОПОЛНЯЕТ
                </h2>
                <p className="text-[12px] lg:text-[16px] text-white/80 leading-5 lg:leading-7 mt-2">
                  Сумки, очки, головные уборы — детали, которые делают образ.
                  <br />
                  Создай стиль до мелочей.
                </p>
                <button className="inline-flex items-center rounded-full bg-white/90 text-black hover:bg-white px-6 py-3 mt-5 text-[12px] tracking-[0.18em] uppercase transition-colors">
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
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col justify-end lg:pl-16 p-6 pb-12">
              <div className="text-start max-w-[680px]">
                <h2 className="font-medium tracking-[0.22em] uppercase text-white text-lg lg:text-[34px]">
                  СКИДКИ ДО -50%
                </h2>
                <p className="text-[12px] lg:text-[16px] text-white/80 leading-5 lg:leading-7 mt-2">
                  Лучшее время обновить гардероб — сезонная распродажа уже
                  началась! <br />
                  Лови стиль по выгодным ценам.
                </p>
                <button className="inline-flex items-center rounded-full bg-white/90 text-black hover:bg-white px-6 py-3 mt-5 text-[12px] tracking-[0.18em] uppercase transition-colors">
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
      <div className="absolute top-1/2 -translate-y-1/2 z-20 flex justify-between w-full px-4 pointer-events-none">
        <button
          ref={prevRef}
          className="hidden lg:flex bg-white/90 rotate-180 w-10 h-10 rounded-full justify-center items-center cursor-pointer hover:bg-white pointer-events-auto shadow-sm"
        >
          <FaArrowRight color="black" />
        </button>
        <button
          ref={nextRef}
          className="hidden lg:flex bg-white/90 w-10 h-10 rounded-full justify-center items-center cursor-pointer hover:bg-white pointer-events-auto shadow-sm"
        >
          <FaArrowRight color="black" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
