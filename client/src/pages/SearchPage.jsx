import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/collection`, {
        params: {
          query: location?.search?.slice(3),
          page: 1,
        },
      });
      if (Array.isArray(response.data.results)) {
        setData((preve) => {
          return [...preve, ...response.data.results];
        });
      } else {
        console.error("No valid results in response", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location?.search]);

  console.log("location");
  return (
    <div className="pt-16">
      <div className="container mx-auto">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6">
            {data.map((searchData, index) => {
              return (
                <Card
                  data={searchData}
                  key={searchData.id + "search"}
                  media_type={searchData.media_type}
                />
              );
            })}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default SearchPage;
