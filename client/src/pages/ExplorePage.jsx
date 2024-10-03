// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ExplorePage = () => {
//   const params = useParams();
//   const [pageNo, setPageNo] = useState(1);
//   const [data, setData] = useState([])

//   console.log("params", params.explore);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`/discover/${params.explore}`, {
//         params: {
//           page: pageNo,
//         },
//       });
//       setPageNo((preve) => {
//         return [...preve, ...response.data.results];
//       });
//       console.log("response", response.data.result);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return <div></div>;
// };

// export default ExplorePage;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Card from "../components/Card";

// const ExplorePage = () => {
//   const params = useParams();
//   const [pageNo, setPageNo] = useState(1);
//   const [data, setData] = useState([]);
//   const [totalPageNo, setTotalPageNo] = useState(0);

//   console.log("params", params.explore);

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await axios.get(`/discover/${params.explore}`, {
//   //       params: {
//   //         page: pageNo,
//   //       },
//   //     });
//   //     setData((preve) => {
//   //       return [...preve, ...response.data.results];
//   //     });
//   //     setTotalPageNo(response.data.total_pages);
//   //   } catch (error) {
//   //     console.log("error", error);
//   //   }
//   // };

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await axios.get(`/discover/${params.explore}`, {
//   //       params: {
//   //         page: pageNo,
//   //       },
//   //     });

//   //     // Log the response to inspect its structure
//   //     console.log("API Response:", response.data);

//   //     // Ensure that 'results' is an array before setting state
//   //     if (response.data && Array.isArray(response.data.results)) {
//   //       setData((prev) => [...prev, ...response.data.results]);
//   //       setTotalPageNo(response.data.total_pages);
//   //     } else {
//   //       console.error("Error: 'results' is not an array or does not exist");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //   }
//   // };

//   const fetchNowPlayingData = async (dispatch, nowPlayingData) => {
//     if (nowPlayingData.length === 0) {
//       try {
//         const response = await getNowPlayingMovie();
//         dispatch(setNowPlayingData(response.data.results));
//       } catch (error) {
//         console.error("Error fetching Now Playing data", error);
//       }
//     }
//   };

//   const handleScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//       setPageNo((preve) => preve + 1);
//     }
//   };

//   useEffect(() => {
//     fetchNowPlayingData();
//   }, [pageNo]);

//   useEffect(() => {
//     setPageNo(1);
//     setData([]);
//     fetchData();
//   }, [params.explore]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="py-16">
//       <div className="container mx-auto">
//         <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
//           Popular {params.explore} show
//         </h3>

//         <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
//           {data.map((exploreData, index) => {
//             return (
//               <Card
//                 data={exploreData}
//                 key={exploreData.id + "exploreSEction"}
//                 media_type={params.explore}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExplorePage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  console.log("params", params.explore);

  // Function to fetch explore data (e.g., discover movies or TV shows)
  const fetchData = async () => {
    try {
      // const response = await axios.get(`/discover/${params.explore}`, {
      //   params: {
      //     page: pageNo,
      //   },
      // });

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${params.explore}`,
        {
          params: {
            page: pageNo,
            api_key: import.meta.env.VITE_API_KEY, // Assuming you are using an API key
          },
        }
      );

      // Log the response to inspect its structure
      console.log("API Response:", response.data);

      // Ensure that 'results' is an array before setting state
      if (response.data && Array.isArray(response.data.results)) {
        setData((prev) => [...prev, ...response.data.results]);
        setTotalPageNo(response.data.total_pages);
      } else {
        console.error("Error: 'results' is not an array or does not exist");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1); // Reset to page 1 when the explore parameter changes
    setData([]); // Clear the current data before fetching new data
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up scroll event listener
    };
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          Popular {params.explore} show
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + "exploreSection"}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
