import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    setSearchInput("");
    router.push({
      pathname: "/search",
      query: {
        city: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 p-3 bg-white shadow-md md:p-5">
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 my-auto cursor-pointer"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="flex items-center py-2 overflow-hidden rounded-full md:border-2 md:shadow-lg">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={`w-full px-5 text-lg  text-gray-600 ${
            placeholder ? "placeholder-black" : "placeholder-gray-300"
          } ${
            placeholder ? "font-bold" : "font-normal"
          }bg-transparent outline-none`}
          type="text"
          placeholder={placeholder || "Type a city to stay"}
        />
        <SearchIcon className="hidden p-2 text-white bg-red-400 rounded-full cursor-pointer h-7 md:inline-flex md:mx-2 " />
      </div>
      <div className="flex items-center justify-end space-x-2 text-gray-500 ">
        <p className="hidden md:inline">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center p-2 space-x-2 border-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-4">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center mb-4 border-b ">
            <h2 className="flex-grow text-2xl font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex">
            <button
              onClick={resetInput}
              className="flex-grow px-4 py-2 text-gray-500 rounded-lg hover:text-white hover:bg-red-400"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow px-4 py-2 text-red-400 rounded-lg hover:text-white hover:bg-red-400"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
