import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const handleprevious = () => {
    if (currentImage > 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData &&
          bannerData.map((data, index) => {
            return (
              <div
                key={data.id + "bannerHome" + index}
                className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <div className="w-full h-full">
                  <img
                    src={imageURL + data.backdrop_path}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/***button next and previous image */}
                <div className="absolute top-0 items-center justify-between hidden w-full h-full px-4 group-hover:lg:flex">
                  <button
                    onClick={handleprevious}
                    className="z-10 p-1 text-xl text-black bg-white rounded-full"
                  >
                    <FaAngleLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className="z-10 p-1 text-xl text-black bg-white rounded-full "
                  >
                    <FaAngleRight />
                  </button>
                </div>

                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

                <div className="container mx-auto">
                  <div className="absolute bottom-0 w-full max-w-md px-3 ">
                    <h2 className="text-2xl font-bold text-white lg:text-4xl drop-shadow-2xl ">
                      {data?.title || data?.name}
                    </h2>
                    <p className="my-2 text-ellipsis line-clamp-3">
                      {data.overview}
                    </p>
                    <div className="flex items-center gap-4">
                      <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                      <span>|</span>
                      <p>View : {Number(data.popularity).toFixed(0)}</p>
                    </div>
                    <Link to={"/" + data?.media_type + "/" + data.id}>
                      <button className="px-4 py-2 mt-4 font-bold text-black transition-all bg-white rounded shadow-md hover:bg-gradient-to-l from-red-700 to-orange-500 hover:scale-105">
                        Play Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default BannerHome;

// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

// function BannerHome() {
//   const bannerData = useSelector((state) => state.movieoData.bannerData);
//   console.log(bannerData, "????>>>>>>????");

//   const imageURL = useSelector((state) => state.movieoData.bannerData);
//   //   console.log("banner home", bannerData);
//   const [currentImage, setCurrentImage] = useState(0);
//   useEffect(() => {}, [currentImage]);

//   const handleNext = () => {
//     if (currentImage < bannerData.length - 1) {
//       setCurrentImage((prev) => prev + 1);
//     } else {
//       setCurrentImage(0);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentImage > 0) {
//       setCurrentImage((prev) => prev - 1);
//     } else {
//       setCurrentImage(bannerData.length - 1);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (currentImage < bannerData.length - 1) {
//         handleNext();
//       } else {
//         setCurrentImage(0);
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [bannerData, imageURL]);
//   return (
//     <section className="w-full h-full">
//       <div className="flex min-h-full max-h-[95vh] overflow-hidden">
//         {bannerData.map((data, index) => (
//           <div
//             key={data.id + "BannerHome" + index}
//             className={`min-w-full min-h-[450px] overflow-hidden relative group transition-all duration-500 ease-in-out`}
//             style={{
//               transform: `translateX(-${currentImage * 100}%)`,
//             }}
//           >
//             <div className="w-full h-full">
//               <img
//                 src={imageURL + data.backdrop_path}
//                 alt={data.title}
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             {/* Next and Previous buttons */}
//             <div className="absolute top-0 items-center justify-between hidden w-full h-full px-5 group-hover:flex">
//               <button
//                 onClick={handlePrevious}
//                 className="z-10 text-2xl bg-zinc-800 text-zinc-400"
//               >
//                 <VscTriangleLeft />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="z-10 text-2xl bg-zinc-800 text-zinc-400"
//               >
//                 <VscTriangleRight />
//               </button>
//             </div>

//             <div className="absolute top-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
//             <div className="container mx-auto">
//               <div className="absolute bottom-0 w-full max-w-md px-3 ">
//                 <h2 className="text-2xl font-bold lg:text-4xl text-zinc-100 drop-shadow-2xl">
//                   {data.title}
//                 </h2>
//                 <p className="my-2 text-ellipsis line-clamp-3">
//                   {data.overview}
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
//                   <p>View: {Number(data.popularity).toFixed(0)}</p>
//                 </div>
//                 <button className="px-4 py-2 mt-4 font-bold text-black transition-all rounded shadow-md bg-zinc-100 hover:bg-gradient-to-l from-zinc-800 to-zinc-600 hover:scale-105">
//                   Play Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default BannerHome;

// ---------------------------------------------------------------------

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

// function HomeBanner() {
//   const bannerData = useSelector((state) => state.gmovieData.bannerData);
//   const imageURL = useSelector((state) => state.gmovieData.imageURL);
//   const [currentImage, setCurrentImage] = useState(0);
//   useEffect(() => {}, [currentImage]);

//   const handleNext = () => {
//     if (currentImage < bannerData.length - 1) {
//       setCurrentImage((prev) => prev + 1);
//     } else {
//       setCurrentImage(0);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentImage > 0) {
//       setCurrentImage((prev) => prev - 1);
//     } else {
//       setCurrentImage(bannerData.length - 1);
//     }
//   };
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (currentImage < bannerData.length - 1) {
//         handleNext();
//       } else {
//         setCurrentImage(0);
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [bannerData, imageURL]);

//   return (
//     <section className="w-full h-full">
//       <div className="flex min-h-full max-h-[95vh] overflow-hidden">
//         {bannerData.map((data, index) => (
//           <div
//             key={data.id + "BannerHome" + index}
//             className={`min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all duration-500 ease-in-out`}
//             style={{
//               transform: `translateX(-${currentImage * 100}%)`,
//             }}
//           >
//             <div className="w-full h-full">
//               <img
//                 src={imageURL + data.backdrop_path}
//                 alt={data.title}
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             {/* Next and Previous buttons */}
//             <div className="absolute top-0 items-center justify-between hidden w-full h-full px-5 group-hover:flex">
//               <button
//                 onClick={handlePrevious}
//                 className="z-10 text-2xl bg-zinc-800 text-zinc-400"
//               >
//                 <VscTriangleLeft />
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="z-10 text-2xl bg-zinc-800 text-zinc-400"
//               >
//                 <VscTriangleRight />
//               </button>
//             </div>

//             <div className="absolute top-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
//             <div className="container mx-auto">
//               <div className="absolute bottom-0 w-full max-w-md px-3 ">
//                 <h2 className="text-2xl font-bold lg:text-4xl text-zinc-100 drop-shadow-2xl">
//                   {data.title}
//                 </h2>
//                 <p className="my-2 text-ellipsis line-clamp-3">
//                   {data.overview}
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
//                   <p>View: {Number(data.popularity).toFixed(0)}</p>
//                 </div>
//                 <button className="px-4 py-2 mt-4 font-bold text-black transition-all rounded shadow-md bg-zinc-100 hover:bg-gradient-to-l from-zinc-800 to-zinc-600 hover:scale-105">
//                   Play Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default HomeBanner;
