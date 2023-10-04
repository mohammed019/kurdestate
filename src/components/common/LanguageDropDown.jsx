/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

const LanguageDropDown = ({
  toggleDropdown,
  isDropDown,
  handleLanguageChange,
}) => {
  const { t, i18n } = useTranslation("header");
  return (
    <div
      className="flex relative justify-center justify-items-center items-center"
      dir={i18n.language === "ku" ? "rtl" : "ltr"}
    >
      {/* Avatar */}
      <button
        className="flex mx-3 transition duration-150 ease-in-out text-sm focus:outline-none bg-transparent rounded-full md:mr-0 "
        type="button"
        onClick={toggleDropdown}
      >
        <GrLanguage className="w-6 h-6" />
      </button>
      {/* Drop down */}
      <div
        className={`absolute rtl:-left-16 ltr:-right-16 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${
          isDropDown
            ? "duration-300 transition-opacity ease-in-out opacity-100"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <ul className="">
          {/* Language drop down */}
          <li>
            <div
              className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
            >
              <ul className="py-2 text-sm text-gray-700 ">
                <li>
                  <a
                    onClick={() => handleLanguageChange("ku")}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {t("Kurdish")}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleLanguageChange("en")}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {t("English")}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageDropDown;
