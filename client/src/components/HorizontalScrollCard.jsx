import React, { useRef } from "react";
import Card from "./Card";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

const HorizontalScrollCard = ({ data = [], heading }) => {
  const contaierRef = useRef();

  const handleNext = () => {
    contaierRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    contaierRef.current.scrollLeft -= 300;
  };
  return (
    <div>
      <div className="container px-3 mx-auto my-10">
        <h2 className="mb-2 text-xl font-bold text-white lg:text-2xl">
          {heading}
        </h2>
        <div className="relative">
          <div
            ref={contaierRef}
            className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none"
          >
            {data.map((data, index) => {
              return (
                <Card
                  key={data.id + "heading" + index}
                  data={data}
                  index={index + 1}
                  trending={true}
                />
              );
            })}
          </div>
          <div className="absolute top-0 items-center justify-between hidden w-full h-full lg:flex">
            <button
              onClick={handlePrevious}
              className="z-10 p-1 -ml-2 text-black bg-white rounded-full"
            >
              <VscTriangleLeft />
            </button>
            <button
              onClick={handleNext}
              className="z-10 p-1 -mr-2 text-black bg-white rounded-full"
            >
              <VscTriangleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
