import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const DayDateSlider = () => {
  const dateRange = [
    { day: "MON", date: "01" },
    
    { day: "TUE", date: "02" },
    { day: "WED", date: "03" },
    { day: "THU", date: "04" },
    { day: "FRI", date: "05" },
    { day: "SAT", date: "06" },
    { day: "SUN", date: "07" },
    { day: "MON", date: "08" },
    { day: "TUE", date: "09" },
    { day: "WED", date: "10" },
    { day: "THU", date: "11" },
    { day: "FRI", date: "12" },
    { day: "SAT", date: "13" },
    { day: "SUN", date: "14" },
    { day: "MON", date: "15" },
    { day: "TUE", date: "16" },
    { day: "WED", date: "17" },
    { day: "THU", date: "18" },
    { day: "FRI", date: "19" },
    { day: "SAT", date: "20" },
    { day: "SUN", date: "21" },
    { day: "MON", date: "22" },
    { day: "TUE", date: "23" },
    { day: "WED", date: "24" },
    { day: "THU", date: "25" },
    { day: "FRI", date: "26" },
    { day: "SAT", date: "27" },
    { day: "SUN", date: "28" },
    { day: "SAT", date: "29" },
    { day: "SUN", date: "30" },
  ];

  return (
    <>
      <div className="container flex justify-center items-center">
        <Swiper
          spaceBetween={10}
          slidesPerView={7} // Show 7 slides at a time
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {dateRange.map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" py-2 px-2 hover:bg-green rounded-lg cursor-pointer hover:text-white text-center">
                <p className="text-xs font-poppins pt-4">{item.day}</p>
                <p className="text-xl font-poppins pt-4">{item.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default DayDateSlider;
