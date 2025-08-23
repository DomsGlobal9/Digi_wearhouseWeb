import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Settings, LogOut, Menu, X } from "lucide-react";
import menImage from "../../assets/men.png";
import womenImage from "../../assets/women.png";
import kidsImage from "../../assets/kids.png";
import accessoriesImage from "../../assets/accessories.png";
import logo from "../../assets/digi_logo.svg";
import notificationIcon from "../../assets/notification-icon.svg";
import user_icon from "../../assets/user-circle.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const notifRef = useRef(null);
  const categoriesRef = useRef(null);
  const profileRef = useRef(null);

  // Categories data with subcategories
  const categories = [
    {
      id: 1,
      name: "Women",
      image: womenImage,
      backgroundColor: "#D4A574",
      subcategories: {
        Topwear: [
          "T-shirts",
          "Tops & Blouses",
          "Shirts",
          "Kurtis & Kurtas",
          "Tunics",
          "Tank Tops",
          "Crop Tops",
          "Camisoles",
        ],
        Bottomwear: [
          "Jeans",
          "Trousers & Pants",
          "Leggings",
          "Palazzos",
          "Skirts",
          "Shorts",
          "Jeggings",
          "Culottes",
          "Dhoti Pants",
        ],
        "Ethnic wear": [
          "Sarees",
          "Salwar Suits",
          "Lehengas",
          "Anarkalis",
          "Dupattas",
          "Ethnic Jackets",
          "Gowns",
        ],
        "Dresses & Jumpsuits": [
          "Maxi Dresses",
          "Midi Dresses",
          "Bodycon Dresses",
          "A-line Dresses",
          "Jumpsuits",
          "Rompers",
        ],
        "Sleepwear": [
          "Night Suits",
          "Nighties",
          "Pyjamas",
          "Loungewear Sets",
          "Robes",
        ],
        Winterwear: [
          "Sweaters",
          "Cardigans",
          "Sweatshirts",
          "Jackets",
          "Coats",
          "Shawls",
          "Ponchos",
        ],
        Activewear: [
          "Sports Bras",
          "Track Pants",
          "Workout T-Shirts",
          "Yoga Pants",
          "Joggers",
        ],
        Innerwear: ["Bras", "Panties", "Slips & Camisoles", "Shapewear"],
        Maternitywear: [
          "Maternity Dresses",
          "Feeding Tops",
          "Maternity Leggings",
        ],
      },
    },
    {
      id: 2,
      name: "Men",
      image: menImage,
      backgroundColor: "#E53E3E",
      subcategories: {
        Topwear: [
          "T-shirts",
          "Shirts",
          "Polo shirts",
          "Henleys",
          "Sweatshirt",
          "Kurtas",
        ],
        Bottomwear: [
          "Jeans",
          "Trousers",
          "Shorts",
          "Track Pants",
          "Cargos",
          "Chinos",
          "Dhotis & Pajamas",
        ],
        "Ethnic wear": [
          "Kurta Sets",
          "Sherwanis",
          "Nehru Jackets",
          "Pathani Suits",
        ],
        Winterwear: [
          "Jackets",
          "Sweaters",
          "Hoodies",
          "Blazers",
          "Thermal Wear",
        ],
        Activewear: [
          "Gym T-Shirts",
          "Running Shorts",
          "Sports Jackets",
          "Joggers",
        ],
        Innerwear: [
          "Vests",
          "Boxers",
          "Briefs",
          "Nightwear Sets",
          "Loungewear Sets",
        ],
      },
    },
    {
      id: 3,
      name: "Kids",
      image: kidsImage,
      backgroundColor: "#B8860B",
      subcategories: {
        Girls: [
          "Frocks & Dresses",
          "Tops & T-Shirts",
          "Skirts & Shorts",
          "Jeans & Leggings",
          "Lehengas",
          "Kurti set",
          "Nightwear",
          "Sweaters & Jacket",
        ],
        Boys: [
          "T-Shirts & Shirts",
          "Jeans & Trousers",
          "Kurta sets",
          "Sherwanis",
          "Sweatshirts & Jacket",
          "Nightwear",
        ],
        "Infants (0-2)": [
          "Bodysuits",
          "Rompers",
          "Sleepsuits",
          "Frocks (Girls)",
          "Sweatshirts & Jacket",
          "Baby sets",
          "Thermal Wear",
          "Diaper pants",
        ],
      },
    },
    {
      id: 4,
      name: "Accessories",
      image: accessoriesImage,
      backgroundColor: "#F5DEB3",
      subcategories: {
        Accessories: ["Dupattas", "Socks", "Scarves", "Ties", "Pocket Squares"],
      },
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        {/* Top section with logo and icons */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Empty space for alignment */}
            <div className="flex-1 lg:flex-none"></div>

            {/* Centered Logo */}
            <Link to={"/"}> 
            <div className="flex cursor-pointer items-center justify-center flex-1 lg:flex-none">
              <img src={logo} alt="DVYB Logo" className="h-10" />
            </div>
            </Link>

            {/* Right side icons */}
            <div className="flex items-center space-x-4 flex-1 justify-end lg:flex-none">
              {/* Notification Icon */}
              <div className="relative" ref={notifRef}>
                <button
                  className="p-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <img
                    src={notificationIcon}
                    alt="notifications"
                    className="w-6 h-6"
                  />
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center z-50 border border-gray-100">
                    {/* Arrow */}
                    <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 shadow-md border-l border-t border-gray-100"></div>

                    {/* Close button */}
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-black transition-colors"
                    >
                      <X size={18} />
                    </button>

                    {/* Bell Icon */}
                    <div className="flex justify-center mb-4">
                      <span className="text-yellow-400 text-6xl">🔔</span>
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 font-medium mb-4">
                      No Notification yet
                    </p>

                    {/* Button */}
                    <button className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                      Explore Categories
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Icon */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <img src={user_icon} alt="profile" className="w-6 h-6" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="py-1">
                      <Link to={"/profile"}>
                      <button className="cursor-pointer flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings size={18} className="mr-3" />
                        <span>Settings</span>
                      </button>
                      </Link>
                      <Link to={"/login"}>
                      <button className="cursor-pointer flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <LogOut size={18} className="mr-3" />
                        <span>Logout</span>
                      </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with navigation items */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center justify-center space-x-8 py-4">
              <Link to={"/"}>
              <span
                className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </span>
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden"
                    onMouseLeave={() => {
                      setIsCategoriesOpen(false);
                      setSelectedCategory(null);
                    }}
                    style={{
                      width: "100vw",
                      left: "50%",
                      transform: "translateX(-50%)",
                      maxHeight: "80vh",
                      overflowY: "auto",
                    }}
                  >
                    {/* Arrow pointing up */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>

                    <div className="p-8">
                      {!selectedCategory ? (
                        // Main categories view
                        <div className="max-w-6xl mx-auto">
                          <div className="grid grid-cols-4 gap-8 justify-center">
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                className="flex flex-col items-center cursor-pointer group"
                                // onClick={() => setSelectedCategory(category)}
                                // onMouseEnter={() =>
                                //   setSelectedCategory(category)
                                // }
                              >
                                {/* Category Image Circle */}
                                <div
                                  className="w-24 cursor-pointer h-24 rounded-full mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-200 shadow-lg"
                                  style={{
                                    backgroundColor: category.backgroundColor,
                                  }}
                                >
                                  <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                     onClick={() => setSelectedCategory(category)}
                                onMouseEnter={() =>
                                  setSelectedCategory(category)
                                }
                                  />
                                </div>

                                {/* Category Name */}
                                <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                  {category.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        // Subcategories view
                        <div className="max-w-7xl mx-auto">
                          {/* Header with back button and category name */}
                          <div className="flex items-center justify-between mb-8">
                            <button
                              onClick={() => setSelectedCategory(null)}
                              className="flex items-center transition-colors cursor-pointer"
                              style={{color: "rgba(152, 192, 217, 1)"}}
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                              Back to Categories
                            </button>
                            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                              {selectedCategory.name}
                            </h2>
                            <div></div>
                          </div>

                          {/* Subcategories Grid */}
                          <div className="grid grid-cols-6 gap-8">
                            {Object.entries(selectedCategory.subcategories).map(
                              ([subcategoryName, items]) => (
                                <div
                                  key={subcategoryName}
                                  className="space-y-4"
                                >
                                  {/* Subcategory Header */}
                                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2" style={{color: "rgba(152, 192, 217, 1)"}}>
                                    {subcategoryName}
                                  </h3>

                                  {/* Subcategory Items */}
                                  <div className="space-y-2">
                                    {items.map((item, index) => (
                                      <a
                                        key={index}
                                        href="#"
                                        className="block text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors duration-200 py-1"
                                        onClick={() => {
                                          setIsCategoriesOpen(false);
                                          setSelectedCategory(null);
                                        }}
                                      >
                                        {item}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
             <Link to="/orders">
              <span
                className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Orders
              </span>
              </Link>
             <Link to={"/commission"}>
              <span
                className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Commissions
              </span>
               </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Dashboard
              </a>

              {/* Mobile Categories */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-2 pl-4 space-y-2">
                    {categories.map((category) => (
                      <a
                        key={category.id}
                        href="#"
                        className="flex items-center space-x-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: category.backgroundColor }}
                        >
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <span>{category.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
             <Link to="/orders">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Orders
              </a>
              </Link>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Commissions
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
