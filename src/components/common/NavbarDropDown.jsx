import { useTranslation } from "react-i18next";
import { BiConfused } from "react-icons/bi";

/* eslint-disable react/prop-types */
const NavbarDropDown = ({
  handleLogout,
  toggleDropdown,
  toggleLanguageDropdown,
  profilePhoto,
  name,
  email,
  isLanguage,
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
        onClick={() => toggleDropdown()}
      >
        {profilePhoto ? (
          <img
            className={`w-10 border-2 border-primary-500 border-opacity-50 h-10 rounded-full`}
            src={profilePhoto}
            alt=""
          />
        ) : (
          <span
            className={`rounded-[50%] font-bold text-center border-opacity-50 text-xl`}
          >
            <BiConfused className="w-9 h-9" />
          </span>
        )}
      </button>
      {/* Drop down */}
      <div
        dir={i18n.language === "ku" ? "rtl" : "ltr"}
        className={`absolute rtl:left-1 ltr:right-1 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${
          isDropDown
            ? "duration-300 transition-opacity ease-in-out opacity-100"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <div
          dir={i18n.language === "ku" ? "rtl" : "ltr"}
          className="px-4 py-3 truncate text-sm text-gray-900"
        >
          <div
            className="font-bold text-sm"
            dir={i18n.language === "ku" ? "rtl" : "ltr"}
          >
            {name}
          </div>
          <div className="font-normal mt-1 truncate">{email}</div>
        </div>

        <ul
          className="py-2 text-sm text-gray-700"
          dir={i18n.language === "ku" ? "rtl" : "ltr"}
        >
          {/* Language drop down */}
          <li>
            <button
              dir={i18n.language === "ku" ? "rtl" : "ltr"}
              onClick={toggleLanguageDropdown}
              type="button"
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
            >
              {t("Languages")}
              <svg
                className="w-2.5 h-2.5 ml-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
            <div
              className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  ${
                isLanguage ? "" : "hidden"
              }`}
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

          <li>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100 ">
              {t("Settings")}
            </a>
          </li>
          <li>
            <a href="/create" className="block px-4 py-2 hover:bg-gray-100 ">
              {t("Listing Your Property")}
            </a>
          </li>
        </ul>
        <div className="py-2" onClick={handleLogout}>
          <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer  hover:bg-gray-100 ">
            {t("Sign Out")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavbarDropDown;
