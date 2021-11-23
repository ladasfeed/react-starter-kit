import React, { useState } from "react";

type PropsType = {
   length: number;
   margin: number;
};
export const useSlider = (props: PropsType) => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const { length, margin = 20 } = props;

   const nextSlide = () => {
      setCurrentSlide((currentSlide + 1) % length);
   };
   const prevSlide = () => {
      setCurrentSlide(currentSlide ? currentSlide - 1 : length - 1);
   };

   const calcStyle = () => ({
      transform: `translateX(calc(-${100 * currentSlide}% - ${
          margin * currentSlide
      }px))`,
   });

   return {
      currentSlide,
      setCurrentSlide,
      nextSlide,
      prevSlide,
      calcStyle,
   };
};
