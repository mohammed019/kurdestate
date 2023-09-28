/* eslint-disable no-undef */
import { useState, useEffect, useRef, useContext } from "react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import ListingHome from "../components/pages/home/ListingHome";
import hero from "../assets/images/hero.jpg";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel } from "swiper/modules";
import Filters from "../components/pages/home/Filters";
import Typed from "typed.js";
import { SearchResultContext } from "../store/SearchResultProvider";
import { FaRegFaceLaughWink } from "react-icons/fa6";
import { FaPeopleCarry } from "react-icons/fa";
import { BsHouse, BsSearchHeart } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";

const Home = () => {
  const { search } = useContext(SearchResultContext);

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Find Your Dream Property ^500",
        "Find Your Dream House ^500",
        "Find Your Dream Place ^500",
        "Find Your Dream Land ^500",
        "Find Your Dream Villa ^500",
      ],
      typeSpeed: 55,
      showCursor: false,
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("offer", "==", true),
          where("status", "==", "accepted"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const snapShotQuery = await getDocs(q);
        let listings = [];
        snapShotQuery.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListing(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // rent
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        // create the query
        const q = query(
          listingRef,
          where("status", "==", "accepted"),
          orderBy("type"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const snapShotQuery = await getDocs(q);
        let listings = [];
        snapShotQuery.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  // // sale
  // const [saleListing, setSaleListing] = useState(null);

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       const listingRef = collection(db, "listings");
  //       // create the query
  //       const q = query(
  //         listingRef,
  //         where("type", "==", "sell"),
  //         where("status", "==", "accepted"),
  //         orderBy("timeStamp", "desc"),
  //         limit(6)
  //       );

  //       const snapShotQuery = await getDocs(q);
  //       let listings = [];
  //       snapShotQuery.forEach((doc) => {
  //         return listings.push({
  //           id: doc.id,
  //           data: doc.data(),
  //         });
  //       });
  //       setSaleListing(listings);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchListings();
  // }, []);

  return (
    <>
      <div
        className="h-[103vh]"
        style={{
          background: `url(${hero}) center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0 bg-black opacity-95"
          style={{ background: "rgba(0, 0, 0, .5)" }}
        >
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h1
              ref={el}
              className="font-bebas text-4xl md:text-6xl font-bold text-white"
            ></h1>
            <p className="font-bebas text-base sm:text-lg md:text-xl font-medium pt-2 text-white">
              Discover Your Dream Property with Us
            </p>
          </div>
        </div>
      </div>

      <Filters />

      <div>
        <div className="max-w-6xl max-xl:w-[95%] mx-auto pt-4 ">
          {/* offer */}
          {search && search.length > 0 && (
            <div className="my-6">
              <h2 className="px-3 font-semibold text-3xl text-center">
                Browse Our Exclusive Listings
              </h2>
              <div>
                <Swiper
                  className=""
                  breakpoints={{
                    100: {
                      slidesPerView: 1.4,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2.4,
                      spaceBetween: 20,
                    },
                    796: {
                      slidesPerView: 2.6,
                      spaceBetween: 25,
                    },
                    930: {
                      slidesPerView: 2.8,
                      spaceBetween: 25,
                    },
                    1110: {
                      slidesPerView: 3.7,
                      spaceBetween: 30,
                    },
                  }}
                  loop={false}
                  freeMode={true}
                  mousewheel={true}
                  grabCursor={true}
                  modules={[FreeMode, Mousewheel]}
                >
                  {search.map((data) => (
                    <SwiperSlide key={data.id}>
                      <ListingHome listing={data.data} id={data.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
          {/* listings */}
          {listings && listings.length > 0 && (
            <div className="my-16">
              <h2 className="px-3 font-semibold text-3xl text-center">
                Discover Our Listings
              </h2>
              <div>
                <Swiper
                  className="my-6"
                  breakpoints={{
                    100: {
                      slidesPerView: 1.2,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2.2,
                      spaceBetween: 20,
                    },
                    796: {
                      slidesPerView: 2.4,
                      spaceBetween: 25,
                    },
                    930: {
                      slidesPerView: 2.8,
                      spaceBetween: 25,
                    },
                    1110: {
                      slidesPerView: 3.7,
                      spaceBetween: 30,
                    },
                  }}
                  loop={false}
                  freeMode={true}
                  mousewheel={true}
                  grabCursor={true}
                  modules={[FreeMode, Mousewheel]}
                >
                  {listings.map((rent) => (
                    <SwiperSlide key={rent.id}>
                      <ListingHome listing={rent.data} id={rent.id} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <Link to="/category/rent" className="text-center">
                  <p className="text-white bg-primary-500 inline font-bold text-center p-3 rounded text-sm hover:bg-primary-600 transition duration-150 ease-in-out">
                    Show more places for sale
                  </p>
                </Link> */}
              </div>
            </div>
          )}
          <div className="py-16 mt-12 bg-background w-full h-full text-center">
            <h1 className="font-semibold text-3xl ">Why Choose Us</h1>
            <p className="text-gray-500 text-sm font-medium">
              Lorem ipsum dolor sit, amet consectetur adipisicing.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              <div className="p-6 bg-white pb-12 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-105 rounded-lg shadow-md">
                <p className="text-center">
                  <FaRegFaceLaughWink className="w-16 h-16 text-center mx-auto mb-6 text-white bg-primary-500 p-4 rounded-[50%]" />
                </p>

                <h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
                  Trusted By Thousands
                </h2>

                <p className="mt-2 text-gray-800 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias excepturi fuga, laudantium molestias nesciunt tempore.
                </p>
              </div>
              <div className="p-6 bg-white pb-12 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-105 rounded-lg shadow-lg">
                <p className="text-center">
                  <BsSearchHeart className="w-16 h-16 text-center mx-auto mb-6 p-2 text-primary-500 " />
                </p>

                <h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
                  Easy Searching
                </h2>

                <p className="mt-2 text-gray-800 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias excepturi fuga, laudantium molestias nesciunt tempore.
                </p>
              </div>
              <div className="p-6 bg-white pb-12 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-105 rounded-lg shadow-lg">
                <p className="text-center">
                  <RiMoneyDollarCircleLine className="w-16 h-16 text-center mx-auto mb-6 text-white bg-primary-500 p-4 rounded-[50%]" />
                </p>

                <h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
                  Financing Made Easy
                </h2>

                <p className="mt-2 text-gray-800 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias excepturi fuga, laudantium molestias nesciunt tempore.
                </p>
              </div>
              <div className="p-6 bg-white pb-12 transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-105 rounded-lg shadow-lg">
                <p className="text-center">
                  <FaPeopleCarry className="w-16 h-16 text-center mx-auto mb-6 p-2 text-primary-500 " />
                </p>

                <h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
                  See Neighborhoods
                </h2>

                <p className="mt-2 text-gray-800 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias excepturi fuga, laudantium molestias nesciunt tempore.
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="my-16 bg-background w-full h-full text-center">
            <h1 className="font-semibold text-3xl ">Explore Our Properties</h1>
            <p className="text-gray-500 text-sm font-medium">
              Lorem ipsum dolor sit, amet consectetur adipisicing.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              <Link
                to={"category/house"}
                className="cursor-pointer group p-4 shadow-lg bg-white rounded-lg flex justify-center items-center flex-col hover:scale-105 transition-all duration-300 ease-in-out"
                style={{
                  background: `url(https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="pb-16"></div>
                <p className="text-center group-hover:scale-150 transition-all duration-300 ease-in-out">
                  <BsHouse className="w-16 h-16  text-center mx-auto mb-6 text-white" />
                </p>

                <h2 className="font-semibold text-lg text-center text-white mt-2">
                  House
                </h2>
                <div className="pb-24"></div>
              </Link>
              <Link
                to={"category/apartment"}
                className="cursor-pointer group p-4 shadow-lg bg-white rounded-lg flex justify-center items-center flex-col hover:scale-105 transition-all duration-300 ease-in-out"
                style={{
                  background: `url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="pb-16"></div>
                <p className="text-center group-hover:scale-150 transition-all duration-300 ease-in-out">
                  <MdApartment className="w-16 h-16  text-center mx-auto mb-6 text-white" />
                </p>

                <h2 className="font-semibold text-lg text-center text-white mt-2">
                  Apartment
                </h2>
                <div className="pb-24"></div>
              </Link>
              <Link
                to={"category/land"}
                className="cursor-pointer group p-4 shadow-lg bg-white rounded-lg flex justify-center items-center flex-col hover:scale-105 transition-all duration-300 ease-in-out"
                style={{
                  background: `url(https://plus.unsplash.com/premium_photo-1661963869605-4b5f4c8e55f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="pb-16"></div>
                <p className="text-center group-hover:scale-150 transition-all duration-300 ease-in-out">
                  <GiIsland className="w-16 h-16  text-center mx-auto mb-6 text-white" />
                </p>

                <h2 className="font-semibold text-lg text-center text-white mt-2">
                  Land
                </h2>
                <div className="pb-24"></div>
              </Link>
              <Link
                to={"category/shop"}
                className="cursor-pointer group p-4 shadow-lg bg-white rounded-lg flex justify-center items-center flex-col hover:scale-105 transition-all duration-300 ease-in-out"
                style={{
                  background: `url(https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60) center no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="pb-16"></div>
                <p className="text-center group-hover:scale-150 transition-all duration-300 ease-in-out">
                  <AiOutlineShop className="w-16 h-16  text-center mx-auto mb-6 text-white" />
                </p>

                <h2 className="font-semibold text-lg text-center text-white mt-2">
                  Shop
                </h2>
                <div className="pb-24"></div>
              </Link>
            </div>
          </div>
        </div>
        <footer className="bg-headerBackground shadow-2xl py-4 dark:bg-gray-800">
          <div className="w-full mx-auto p-4 flex items-center justify-center">
            <span className="text-lg font-bold text-primary-500 sm:text-center dark:text-gray-400">
              © 2023 -
              <a href="https://mohammedd.com/" className="">
                {" "}
                Mohammed Jabbar{" "}
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
