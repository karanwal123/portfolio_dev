import React, { useState, useEffect, useRef } from "react";
import { Menu, ArrowLeft, Edit2, Lightbulb, X } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaLinkedin,
  FaGithub,
  FaJava,
  FaPython,
  FaFigma,
} from "react-icons/fa";
import {
  SiLeetcode,
  SiC,
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiNotion,
  SiGreensock,
  SiFramer,
  SiAdobeillustrator,
} from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import WindowsXPFooter from "./components/Footer";
import tbdLogo from "./assets/tbd_logo.png";
import carens_chopped from "./assets/carens_chopped.png";
import BooksPage from "./components/BooksPage";
import lnm from "./assets/lnm.png";
import { ExternalLink } from "lucide-react";

// Main App Component with Routing Logic
const App = () => {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [views, setViews] = useState(() => {
    // Get stored views from localStorage or start from 0
    const storedViews = localStorage.getItem("portfolioViews");
    return storedViews ? parseInt(storedViews) : 0;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increment view count on component mount
    const newViews = views + 1;
    setViews(newViews);
    localStorage.setItem("portfolioViews", newViews.toString());

    // Ensure loading screen stays for at least 5s, and longer if page isn't fully loaded yet
    let isCancelled = false;
    const minTimer = new Promise((resolve) => setTimeout(resolve, 5000));
    const loadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });

    Promise.all([minTimer, loadPromise]).then(() => {
      if (!isCancelled) setIsLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const navigate = (route) => {
    setCurrentRoute(route);
  };

  return (
    <div className="relative min-h-screen bg-[#B8D4C8]">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar
              currentRoute={currentRoute}
              navigate={navigate}
              views={views}
            />
            <MainContent currentRoute={currentRoute} />
          </div>
          <WindowsXPFooter />
        </>
      )}
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ currentRoute, navigate, views }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: "Home", route: "/" },
    { label: "Projects", route: "/projects" },
    { label: "Hackathons", route: "/hackathons" },
    { label: "Designs", route: "/designs" },
    { label: "Books", route: "/books" },
  ];

  const btnRefs = navItems.map(() => useRef(null));

  const handleNavClick = (route, idx) => {
    navigate(route);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-black text-white p-3 flex items-center justify-between">
        <div className="font-bold text-lg">PORTFOLIO</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-800"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-64 h-full p-4 shadow-[4px_4px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="bg-black text-white px-3 py-2 text-base font-bold">
                PORTFOLIO
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-1.5 mb-6">
              {navItems.map((item, idx) => (
                <button
                  key={item.route}
                  ref={btnRefs[idx]}
                  onClick={() => handleNavClick(item.route, idx)}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                    currentRoute === item.route
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="border-2 border-black px-3 py-2 bg-white">
              <p className="text-sm font-semibold">Views : {views}</p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-48 p-4 flex-col justify-between h-screen">
        <div>
          <div className="bg-black text-white px-3 py-2 text-base font-bold mb-8">
            PORTFOLIO
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item, idx) => (
              <button
                key={item.route}
                ref={btnRefs[idx]}
                onClick={() => handleNavClick(item.route, idx)}
                className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                  currentRoute === item.route
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-2 border-black px-3 py-2 bg-white">
          <p className="text-sm font-semibold">Views : {views}</p>
        </div>
      </div>
    </>
  );
};

// Main Content Area
const MainContent = ({ currentRoute }) => {
  const renderRoute = () => {
    switch (currentRoute) {
      case "/":
        return <HomePage />;
      case "/projects":
        return <ProjectsPage />;
      case "/hackathons":
        return <HackathonsPage />;
      case "/designs":
        return <DesignsPage />;
      case "/books":
        return <BooksPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex-1 p-2 lg:p-4 border-2 border-black m-1 lg:m-2 bg-[#FFF6E5] overflow-y-auto min-h-screen lg:min-h-0 lg:h-screen">
      {renderRoute()}
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const cardRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [showTipWindow, setShowTipWindow] = useState(true);

  return (
    <div>
      {/* Retro Tip Window */}
      {showTipWindow && (
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ x: "-50%", y: "-50%" }}
          whileDrag={{ cursor: "move" }}
        >
          <div className="w-80 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-white border-l-white border-r-black border-b-black shadow-[4px_4px_0_0_#000]">
            {/* Title Bar */}
            <div className="bg-[#000080] px-2 py-1 flex items-center justify-between text-white cursor-move">
              <span className="text-sm select-none">BRUHHH</span>
              <button
                onClick={() => setShowTipWindow(false)}
                className="px-2 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa]"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <Lightbulb className="w-12 h-12 text-black flex-shrink-0" />
                <p className="text-sm select-none">
                  Don't talk about academic and CGPA
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowTipWindow(false)}
                  className="px-6 py-1 border-t-2 border-l-2 border-r-2 border-b-2 border-t-white border-l-white border-r-black border-b-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white bg-[#c0c0c0]"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-1 mb-2">
        <button className="p-1.5 border-2 border-black hover:bg-gray-100">
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => setShowTipWindow(true)}
          className="p-1.5 border-2 border-black hover:bg-gray-100 flex items-center gap-1"
        >
          <Lightbulb size={18} />
          <span className="text-xs font-medium hidden sm:inline">Show Tip</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
        {/* Top Row: About Me & Work Experience */}
        <div
          ref={cardRefs[0]}
          className="flex flex-col border-2 border-black bg-[#FFE7A0] p-3 lg:p-4"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            About Me :
          </h1>
          <ProfileCard />
        </div>
        <div
          ref={cardRefs[1]}
          className="flex flex-col border-2 border-black bg-[#F8F8F8] p-3 lg:p-4"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Work experience
          </h2>
          <WorkExperienceCard />
        </div>
        {/* Middle Row: Education */}
        <div
          ref={cardRefs[2]}
          className="flex flex-col border-2 border-black bg-[#E8F4FD] p-3 lg:p-4"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Education
          </h2>
          <EducationCard />
        </div>
        {/* Bottom Row: Tech Stack & Stats */}
        <div
          ref={cardRefs[3]}
          className="flex flex-col border-2 border-black bg-[#F3D1FF] p-3 lg:p-4 items-center justify-center col-span-1"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center text-black">
            {/* Programming Languages */}
            <SiC
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiCplusplus
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaJava
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaPython
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaJsSquare
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />

            {/* Web Technologies */}
            <FaReact
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaNodeJs
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiExpress
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaHtml5
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaCss3Alt
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiFastapi
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />

            {/* Databases & APIs */}
            <SiMongodb
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiMysql
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />

            {/* Tools & Frameworks */}
            <FaGitAlt
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiTailwindcss
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <FaFigma
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiNotion
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiGreensock
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiFramer
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
            <SiAdobeillustrator
              size={24}
              className="sm:w-7 sm:h-7"
              style={{ filter: "grayscale(1)" }}
            />
          </div>
        </div>
        <div
          ref={cardRefs[4]}
          className="flex flex-col border-2 border-black bg-[#BDD7FF] p-3 lg:p-4 items-center justify-center col-span-1"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3">Stats</h3>
          <div className="flex gap-4 sm:gap-8">
            <StatCounter label="Hackathons" value={5} suffix="+" />
            <StatCounter label="Projects" value={10} suffix="+" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Card Component
const ProfileCard = () => {
  const [showPicPopup, setShowPicPopup] = useState(false);

  return (
    <>
      {/* Popup Picture Window */}
      {showPicPopup && (
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
          className="fixed top-1/2 left-1/2 z-50"
          initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="w-72 sm:w-96 bg-[#c0c0c0] border-t-2 border-l-2 border-r-2 border-b-2 border-t-white border-l-white border-r-black border-b-black shadow-[4px_4px_0_0_#000]">
            <div className="bg-[#000080] px-2 py-1 flex items-center justify-between text-white cursor-move">
              <span className="text-xs">Profile Picture</span>
              <button
                onClick={() => setShowPicPopup(false)}
                className="px-2 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa]"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-white p-4">
              <img
                src={carens_chopped}
                alt="Profile large"
                className="w-52 h-52 sm:w-64 sm:h-64 rounded object-cover aspect-square"
                style={{ aspectRatio: "1 / 1" }}
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="border-2 border-black bg-[#F4D58D] p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className="flex-shrink-0 border-2 border-black mx-auto sm:mx-0 w-24 h-24 sm:w-20 sm:h-20 lg:w-24 lg:h-24 overflow-hidden cursor-pointer"
            onClick={() => setShowPicPopup(true)}
            onMouseEnter={() => setShowPicPopup(true)}
            onMouseLeave={() => setShowPicPopup(false)}
            tabIndex={0}
            aria-label="Show Profile Picture"
          >
            <img
              src={carens_chopped}
              alt=""
              className="w-full h-full object-cover aspect-square"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width="96"
              height="96"
              style={{ aspectRatio: "1 / 1" }}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center mb-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mr-0 sm:mr-3">
                Aditya Karanwal
              </h2>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <FaLinkedin size={14} className="sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <SiLeetcode size={14} className="sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <FaGithub size={14} className="sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
            <p className="text-xs sm:text-sm mb-2">adityakaranwal@gmail.com</p>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              Hey there! I’m Aditya Karanwal, a 3rd-year CSE student who loves
              building projects and diving into hackathons that push creativity
              and problem-solving. I have a deep appreciation for typography and
              design, and I’m always drawn to things that blend tech with
              aesthetics. Beyond the screen, you’ll often find me trekking
              through trails, watching Formula 1, or unwinding with some anime.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
              <button className="px-3 sm:px-4 lg:px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 w-full sm:w-auto text-sm sm:text-base">
                Download Resume
              </button>
              <button className="px-3 sm:px-4 lg:px-6 py-2 border-2 border-black font-semibold hover:bg-gray-100 w-full sm:w-auto text-sm sm:text-base">
                Notion
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// Work Experience Card Component
// Work Experience Card Component
const WorkExperienceCard = () => {
  return (
    <div className="border-2 border-black bg-[#F8F8F8] p-3 sm:p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center flex-shrink-0">
          <img
            src={tbdLogo}
            alt="Travel Buddy Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-0.5">
            Frontend Developer
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-0.5">
            Travel Buddy
          </p>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            May - July 2025
          </p>
        </div>
        <a
          href="https://beatravelbuddy.com/community" // your URL here
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-100 flex-shrink-0 inline-flex"
        >
          <ExternalLink size={18} />
        </a>
      </div>
      <p className="text-sm sm:text-base leading-relaxed">
        While at Travel Buddy as a 2-month intern, I was actively involved in
        building a social travel platform that connected over 310K+ active
        travelers. I worked on crafting core user experiences — from a smooth
        group management interface and intuitive trip booking flow with smart
        filters, to an Instagram-style visual feed that brought every journey to
        life.
      </p>
    </div>
  );
};

// Education Card Component
const EducationCard = () => {
  return (
    <div className="border-2 border-black bg-[#F8F8F8] p-3 sm:p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center flex-shrink-0">
          <img
            src={lnm}
            alt="LNM Institute Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">
            Computer Science Engineering
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            @LNM Institute of Information Technology
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 flex-shrink-0">
          <Edit2 size={18} />
        </button>
      </div>

      <p className="text-sm sm:text-base leading-relaxed">
        Pursuing Bachelor's degree in Computer Science Engineering with focus on
        software development, data structures, algorithms, and web technologies.
        Active participant in coding competitions and hackathons.
      </p>
    </div>
  );
};

// Animated Stat Counter Component
const StatCounter = ({ label, value, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let duration = 1000;
    let incrementTime = Math.abs(Math.floor(duration / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold">
        {count}
        {suffix}
      </span>
      <span className="text-sm sm:text-base lg:text-lg">{label}</span>
    </div>
  );
};

// Import Pages
import ProjectsPage from "./components/ProjectsPage";

const HackathonsPage = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Hackathons</h1>
    <p className="mt-4 text-sm sm:text-base lg:text-lg">
      Hackathon achievements go here...
    </p>
  </div>
);

const DesignsPage = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Designs</h1>
    <p className="mt-4 text-sm sm:text-base lg:text-lg">
      Design portfolio goes here...
    </p>
  </div>
);

export default App;
