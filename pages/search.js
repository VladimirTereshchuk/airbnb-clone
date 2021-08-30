import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import searchResults from "../data/searchReasult.json";
import Map from "../components/Map";
import { useEffect } from "react";

function Search({ searchResultArr, searchRequest }) {
  const router = useRouter();

  console.log(`searchResultArr`, searchResultArr);

  const { city, location, startDate, endDate, noOfGuests } = router.query;

  let aviableCitySet = new Set(searchResults[0].map((item) => item.city));
  let aviableCity = [...aviableCitySet];

  const formattedStarDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStarDate} - ${formattedEndDate}`;

  useEffect(() => {
    // effect
    // return () => {
    //   cleanup
    // }
  }, [searchResultArr]);

  return (
    <div className="">
      <Header placeholder={`${city} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs">
            300+ Stays -{" "}
            <span className="px-4 py-2 text-white bg-red-400 rounded-lg">
              {" "}
              {formattedStarDate}
            </span>{" "}
            -{" "}
            <span className="px-4 py-2 text-white bg-red-400 rounded-lg">
              {" "}
              {formattedEndDate}
            </span>{" "}
            - for {noOfGuests} guests
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">Stays in {city}</h1>
          <div className="hidden mb-5 space-x-3 text-gray-800 lg:inline-flex whitespace-nowrap">
            <p className="button"> Cancellation exibility</p>
            <p className="button"> Type of Place</p>
            <p className="button"> Rooms and Beds</p>
            <p className="button"> More filters</p>
          </div>
          {searchResultArr.length === 0 ? (
            <div className="flex flex-col mt-12 mb-24 space-y-4">
              <div className="flex items-center">
                <span className="mr-2 text-xl font-semibold">
                  {searchRequest} -{" "}
                </span>{" "}
                <span> Not available right now</span>
              </div>
              <div className="flex items-center">
                <span>Aviable city -</span>
                {/* <span> */}
                {aviableCity.map((item, i) => (
                  <span className="mr-1 text-xl font-semibold" key={i}>
                    {item},
                  </span>
                ))}
                {/* </span> */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {searchResultArr.map((item) => (
                <InfoCard key={item.img} {...item} />
              ))}
            </div>
          )}
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px] xl:h-[600px]">
          <Map searchResultArr={searchResultArr} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps({ query, params }) {
  let searchResultArr = searchResults[0].filter(
    (item) => item.city.toLocaleUpperCase() === query.city.toLocaleUpperCase()
  );
  // const searchResults = await fetch("https://links.papareact.com/isz").then(
  //   (res) => res.json()
  // );
  return {
    props: {
      searchResultArr,
      searchRequest: query.city,
    },
  };
}
