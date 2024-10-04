import { SiGooglegemini } from "react-icons/si";
import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export const navigation = [
  {
    label: "Tv Show",
    href: "tv",
    icons: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "movie",
    icons: <BiSolidMoviePlay />,
  },
  {
    label: "AI asik-asik",
    href: "gemini",
    icons: <SiGooglegemini />,
  },
];
export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icons: <MdHomeFilled />,
  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icons: <IoSearch />,
  },
  // {
  //   label: "Search",
  //   href: "/search",
  //   icons: <ImSearch />,
  // },
];
