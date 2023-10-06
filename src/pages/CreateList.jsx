/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import Spinner from "../components/common/Spinner"; // for the loading state
import { notifications } from "../components/common/Notifications"; // for the notifications
import { getAuth } from "firebase/auth"; // for the auth to get the current user

import { useMutation } from "@tanstack/react-query";
import { addListing } from "../data/queries";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateList = () => {
  // get the current year for limit the year input
  const currentYear = new Date().getFullYear();

  // auth
  const auth = getAuth();

  const { t, i18n } = useTranslation("create");

  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false); // for the loading state

  const { isLoading, isSuccess, error, mutate } = useMutation({
    mutationKey: "addlisting",
    mutationFn: addListing,
    onSuccess: () => {
      notifications("Listing created we will review it");
      setLoading(false);
      navigateTo("/");
    },
  });

  // english form
  const [formDataEn, setFormDataEn] = useState({
    type: "rent",
    category: "",
    name: "",
    beds: 1,
    baths: 1,
    parking: 0,
    address: "",
    description: "",
    price: 0,
    images: {},
    city: "",
    area: 0,
    yearBuilt: 1800,
  });
  // kurdish form
  const [formDataKu, setFormDataKu] = useState({
    typeKu: "کرێ",
    categoryKu: "",
    nameKu: "",
    bedsKu: 1,
    bathsKu: 1,
    parkingKu: 0,
    addressKu: "",
    descriptionKu: "",
    priceKu: 0,
    areaKu: 0,
    yearBuiltKu: 1800,
  });

  const {
    type,
    category,
    name,
    beds,
    baths,
    parking,
    address,
    description,
    price,
    images,
    area,
    city,
    yearBuilt,
  } = formDataEn; // destructure the form data

  const {
    typeKu,
    categoryKu,
    nameKu,
    bedsKu,
    bathsKu,
    parkingKu,
    addressKu,
    descriptionKu,
    priceKu,
    areaKu,
    yearBuiltKu,
  } = formDataKu; // destructure the form data

  const onFormChange = (e) => {
    // handle the form change for each input or button
    let boolean = null; // to change the button values from false to true and vice versa

    if (e.target.value === "true") {
      // if the value is true, set the boolean to true
      boolean = true;
    }
    if (e.target.value === "false") {
      // if the value is false, set the boolean to false
      boolean = false;
    }

    // Files
    if (e.target.files) {
      // if the input type is file (images) set the images in the state, the images will be an array of files
      setFormDataEn((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    } else if (!e.target.files) {
      // text//number//boolean

      // if the input type is not file (images) set the values in the state
      setFormDataEn((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value, // we say the target id it mean the state name, for example if the input name is rent, the state name is rent, if the input name is beds, the state name is beds, and then we checked before in above if the value for this input or button is false or true it mean if this is a button or not, if it is a button, set the value to boolean, if it is not a button, set the value to the input value it mean it's a text or number
      }));
    }
  };

  const onFormChangeKu = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    if (e.target.files) {
      setFormDataKu((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    } else if (!e.target.files) {
      setFormDataKu((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // set the loading to true while we are uploading the images or storing the data

    if (images.length > 6) {
      // if the images length is greater than 6, return an error
      setLoading(false);
      notifications("You can only upload load 6 images", true);
      return;
    }

    // Loop through each image and check its size
    for (const image of images) {
      if (image.size > 2.1 * 1024 * 1024) {
        setLoading(false);
        notifications("Images must be less than 2.1 MB in size", true);
        return;
      }
    }

    mutate({ e, address, images, formDataEn, formDataKu });
  };

  if (loading || isLoading) {
    // if the loading is true, show the spinner
    return <Spinner />;
  }

  return (
    <>
      <main
        className="md:max-w-3xl max-w-md px-2 mx-auto"
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
      >
        <h1 className="text-3xl font-bold text-center mt-6 border-b pb-6">
          {t("Create Listing")}
        </h1>

        <div
          className={`${
            auth.currentUser.uid === "TvddowUjyETNVQbDiwhoFekvj0J3" &&
            "grid md:grid-cols-2 gap-x-20 w-full"
          }`}
        >
          {/* TvddowUjyETNVQbDiwhoFekvj0J3 */}
          {auth.currentUser.uid === "TvddowUjyETNVQbDiwhoFekvj0J3" && (
            <form onSubmit={onFormSubmit} dir="rtl">
              <h1 className="md:block text-3xl font-bold text-center mt-6 ">
                Kurdish form
              </h1>
              {/* Sell and Rent */}
              <p className="text-lg mt-6 font-semibold">کرێ / فرۆشتن</p>
              <div className="flex">
                <button
                  type="button"
                  id="typeKu"
                  value="فرۆشتن"
                  onClick={onFormChangeKu}
                  className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    typeKu === "کرێ"
                      ? "bg-white text-black"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  فرۆشتن
                </button>
                <button
                  type="button"
                  id="typeKu"
                  value="کرێ"
                  onClick={onFormChangeKu}
                  className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                    typeKu === "فرۆشتن"
                      ? "bg-white text-black"
                      : "bg-slate-600 text-white"
                  }`}
                >
                  کرێ
                </button>
              </div>
              {/* Category */}
              <p className="text-lg mt-6 font-semibold">جۆر</p>
              <select
                id="categoryKu"
                value={categoryKu}
                onChange={onFormChangeKu}
                required
                className="w-full border border-gray-300 rounded-md outline-none text-gray-700 text-xl focus:outline-none focus:ring-0 focus:text-gray-700 focus:border-slate-600 focus:bg-white"
              >
                <option value="">جۆری موڵکەکەت</option>
                <option value="خانوو">خانوو</option>
                <option value="شوقە">شوقە</option>
                <option value="زەوی">زەوی</option>
                <option value="دووکان">دووکان</option>
              </select>
              {/* Name */}
              <p className="text-lg mt-6 font-semibold">ناو</p>
              <input
                type="text"
                id="nameKu"
                value={nameKu}
                onChange={onFormChangeKu}
                placeholder="ناوی موڵکەکەت"
                maxLength="32"
                minLength="6"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
              />
              {/* Beds and Baths */}
              <div className="flex space-x-6 rtl:space-x-reverse">
                <div className="w-full">
                  <p className="text-lg font-semibold">ژووری خەوتن</p>
                  <input
                    type="number"
                    name="bedsKu"
                    id="bedsKu"
                    value={bedsKu}
                    onChange={onFormChangeKu}
                    min="1"
                    max="50"
                    required
                    className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
                  />
                </div>
                <div className="w-full">
                  <p className="text-lg font-semibold">حەمامەکان</p>
                  <input
                    type="number"
                    name="bathsKu"
                    id="bathsKu"
                    value={bathsKu}
                    onChange={onFormChangeKu}
                    min="1"
                    max="50"
                    required
                    className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
                  />
                </div>
              </div>
              {/* Parking */}
              <p className="text-lg mt-6 font-semibold">گەراج</p>
              <div className="flex">
                <input
                  type="number"
                  name="parkingKu"
                  id="parkingKu"
                  value={parkingKu}
                  onChange={onFormChangeKu}
                  min="0"
                  max="50"
                  required
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
                />
              </div>
              {/* Sq Ft */}
              <div className="flex items-center my-6">
                <div className="w-full">
                  <p className="text-lg font-semibold">
                    ڕووبەر (مەتر چوارگۆشە)
                  </p>
                  <input
                    type="number"
                    id="areaKu"
                    value={areaKu}
                    onChange={onFormChangeKu}
                    min="0"
                    required
                    className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              {/* Year Built */}
              <div className="flex items-center mb-6">
                <div className="w-full">
                  <p className="text-lg font-semibold">ساڵی دروست کردن</p>
                  <input
                    type="number"
                    id="yearBuiltKu"
                    value={yearBuiltKu}
                    onChange={onFormChangeKu}
                    min="1800"
                    max={currentYear}
                    required
                    className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              {/* Address */}
              <p className="text-lg mt-6 font-semibold">ناونیشان</p>
              <textarea
                type="text"
                id="addressKu"
                value={addressKu}
                onChange={onFormChangeKu}
                placeholder="Your Property Address"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
              />

              {/* Description */}
              <p className="text-lg font-semibold">وەسفکردن</p>
              <textarea
                type="text"
                id="descriptionKu"
                value={descriptionKu}
                onChange={onFormChangeKu}
                placeholder="Description"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none "
              />

              {/* Price */}
              <div className="flex items-center mb-6">
                <div className="w-full">
                  <p className="text-lg font-semibold">نرخ</p>
                  <div className="flex w-full justify-center items-center space-x-6 rtl:space-x-reverse">
                    <input
                      type="number"
                      id="priceKu"
                      value={priceKu}
                      onChange={onFormChangeKu}
                      min="50"
                      max="400000000"
                      required
                      className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                    />
                    {type === "rent" && (
                      <div className="">
                        <p className="text-md w-full whitespace-nowrap">
                          مانگی \ $
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
          {/* English Form */}
          <form onSubmit={onFormSubmit}>
            {auth.currentUser.uid === "TvddowUjyETNVQbDiwhoFekvj0J3" && (
              <h1 className="md:block text-3xl font-bold text-center mt-6 ">
                English form
              </h1>
            )}
            {/* Sell and Rent */}
            <p className="text-lg mt-6 font-semibold">{t("Sell / Rent")}</p>
            <div className="flex">
              <button
                type="button"
                id="type"
                value="sell"
                onClick={onFormChange}
                className={`ltr:mr-3 rtl:ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                  type === "rent"
                    ? "bg-white text-black"
                    : "bg-slate-600 text-white"
                }`}
              >
                {t("Sell")}
              </button>
              <button
                type="button"
                id="type"
                value="rent"
                onClick={onFormChange}
                className={`ltr:ml-3 rtl:mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-200 ease-in-out w-full ${
                  type === "sell"
                    ? "bg-white text-black"
                    : "bg-slate-600 text-white"
                }`}
              >
                {t("Rent")}
              </button>
            </div>
            {/* Category */}
            <p className="text-lg mt-6 font-semibold">{t("Category")}</p>
            <select
              id="category"
              value={category}
              onChange={onFormChange}
              required
              className="w-full border border-gray-300 rounded-md outline-none text-gray-700 text-xl focus:outline-none focus:ring-0 focus:text-gray-700 focus:border-slate-600 focus:bg-white"
            >
              <option value="">{t("Category Property")}</option>
              <option value="house">{t("House")}</option>
              <option value="apartment">{t("Apartment")}</option>
              <option value="land">{t("Land")}</option>
              <option value="shop">{t("Shop")}</option>
            </select>
            {/* Name */}
            <p className="text-lg mt-6 font-semibold">{t("Name")}</p>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onFormChange}
              placeholder={t("Your Property Name")}
              maxLength="32"
              minLength="6"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
            />
            {/* Beds and Baths */}
            <div className="flex space-x-6 rtl:space-x-reverse">
              <div className="w-full">
                <p className="text-lg font-semibold">{t("Beds")}</p>
                <input
                  type="number"
                  name="beds"
                  id="beds"
                  value={beds}
                  onChange={onFormChange}
                  min="1"
                  max="50"
                  required
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
                />
              </div>
              <div className="w-full">
                <p className="text-lg font-semibold">{t("Baths")}</p>
                <input
                  type="number"
                  name="baths"
                  id="baths"
                  value={baths}
                  onChange={onFormChange}
                  min="1"
                  max="50"
                  required
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
                />
              </div>
            </div>
            {/* Parking */}
            <p className="text-lg mt-6 font-semibold">{t("Parking Spot")}</p>
            <div className="flex">
              <input
                type="number"
                name="parking"
                id="parking"
                value={parking}
                onChange={onFormChange}
                min="0"
                max="50"
                required
                className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
              />
            </div>
            {/* Sq Ft */}
            <div className="flex items-center my-6">
              <div className="w-full">
                <p className="text-lg font-semibold">
                  {t("Area (Square Meters)")}
                </p>
                <input
                  type="number"
                  id="area"
                  value={area}
                  onChange={onFormChange}
                  min="0"
                  required
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
            {/* Year Built */}
            <div className="flex items-center mb-6">
              <div className="w-full">
                <p className="text-lg font-semibold">{t("Year Built")}</p>
                <input
                  type="number"
                  id="yearBuilt"
                  value={yearBuilt}
                  onChange={onFormChange}
                  min="1800"
                  max={currentYear}
                  required
                  className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <p className="text-lg mt-6 font-semibold">{t("Address")}</p>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onFormChange}
              placeholder="Your Property Address"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none mb-6"
            />

            {/* Description */}
            <p className="text-lg font-semibold">{t("Description")}</p>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onFormChange}
              placeholder="Description"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none "
            />
            {/* Price */}
            <div className="flex items-center mb-6">
              <div className="w-full">
                <p className="text-lg font-semibold">{t("Price")}</p>
                <div className="flex w-full justify-center items-center space-x-6 rtl:space-x-reverse">
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={onFormChange}
                    min="50"
                    max="400000000"
                    required
                    className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                  />
                  {type === "rent" && (
                    <div className="">
                      <p className="text-md w-full whitespace-nowrap">
                        {t("$ / Months")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {auth.currentUser.uid === "TvddowUjyETNVQbDiwhoFekvj0J3" && (
              <div className="flex items-center mb-6">
                <div className="w-full">
                  <p className="text-lg font-semibold">{t("City")}</p>
                  <div className="flex w-full justify-center items-center space-x-6 rtl:space-x-reverse">
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={onFormChange}
                      required
                      placeholder="To connect this property with cities in the search in Home"
                      className="w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300 rounded-md outline-none transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Images */}
            <div className="mb-6">
              <p className="text-lg mt-6 font-semibold">{t("Images")}</p>
              <p className="text-gray-600">
                {t("The first image will be the cover (max images 6)")}
              </p>
              <input
                type="file"
                id="images"
                onChange={onFormChange}
                accept=".jpg,.png,.jpeg"
                multiple
                required
                className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:border-slate-600 focus:ring-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:bg-blue-700 active:bg-blue-700 active:shadow-lg transition duration-200 ease-in-out"
            >
              {t("Create Listing")}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateList;
