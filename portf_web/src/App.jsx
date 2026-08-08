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
import animatedPfp from "./assets/animated_pfp_carens.mp4";
import BooksPage from "./components/BooksPage";
import MediumArticlesPage from "./components/MediumArticlesPage";
import MusicPage from "./components/MusicPage";
import lnm from "./assets/lnm.png";
import shikshaLogo from "./assets/shiksha_retro.png";
import delhiMetroVideo from "./assets/that_is_delhi_mertro_blue_lin_gwr_video_mvp.mp4";
import { ExternalLink } from "lucide-react";

// Main App Component with Routing Logic
const App = () => {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    // Minimum display time for the loading screen
    const minTimer = new Promise((resolve) => setTimeout(resolve, 5000));

    // Wait for the document to be fully parsed
    const domReady = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });

    // Preload every image — returns a promise that resolves when cached
    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // don't block on failure
        img.src = src;
      });

    // Preload a video — resolves once enough data is buffered to play
    const preloadVideo = (src) =>
      new Promise((resolve) => {
        const vid = document.createElement("video");
        vid.preload = "auto";
        vid.muted = true;
        vid.playsInline = true;
        vid.oncanplaythrough = resolve;
        vid.onerror = resolve;
        vid.src = src;
        try { vid.load(); } catch { resolve(); }
        // Safety timeout so a slow video doesn't hold the loader forever
        setTimeout(resolve, 8000);
      });

    // All assets that should be warm before the loader drops
    const imageAssets = [carens_chopped, tbdLogo, lnm, shikshaLogo];
    const videoAssets = [animatedPfp, delhiMetroVideo];

    const allReady = Promise.all([
      minTimer,
      domReady,
      ...imageAssets.map(preloadImage),
      ...videoAssets.map(preloadVideo),
    ]);

    allReady.then(() => {
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
            <Sidebar currentRoute={currentRoute} navigate={navigate} />
            <MainContent currentRoute={currentRoute} />
          </div>
          <WindowsXPFooter navigate={navigate} />
        </>
      )}
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ currentRoute, navigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: "Home", route: "/" },
    { label: "Projects", route: "/projects" },
    { label: "Hackathons", route: "/hackathons" },
    { label: "Designs", route: "/designs" },
    { label: "Books", route: "/books" },
    { label: "Articles", route: "/articles" },
    { label: "Music", route: "/music" },
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
                  className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${currentRoute === item.route
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-48 p-4 flex-col h-screen">
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
                className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${currentRoute === item.route
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
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
      case "/articles":
        return <MediumArticlesPage />;
      case "/music":
        return <MusicPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex-1 p-2 lg:p-4 border-2 border-black m-1 lg:m-2 bg-[#FFF6E5] overflow-y-auto retro-scrollbar min-h-screen lg:min-h-0 lg:h-screen">
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
              <span className="text-sm select-none">Ssup Twin</span>
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
        {/* Row 1: About Me & ShikshaLokam */}
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
          <ShikshaLokamCard />
        </div>

        {/* Row 2: Travel Buddy & Education */}
        <div
          className="flex flex-col border-2 border-black bg-[#F8F8F8] p-3 lg:p-4"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Previous experience
          </h2>
          <TravelBuddyCard />
        </div>
        <div
          ref={cardRefs[2]}
          className="flex flex-col border-2 border-black bg-[#E8F4FD] p-3 lg:p-4"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Education
          </h2>
          <EducationCard />
        </div>

        {/* Cinematic Video Frame — full-width ambient strip */}
        <div className="col-span-1 lg:col-span-2">
          <ViewFromWindowCard />
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
            <StatCounter label="Events" value={4} suffix="+" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Card Component
const ProfileCard = () => {
  const [showPicPopup, setShowPicPopup] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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
              {showVideo ? (
                <video
                  src={animatedPfp}
                  className="w-52 h-52 sm:w-64 sm:h-64 rounded object-cover scale-110"
                  style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => setShowVideo(false)}
                />
              ) : (
                <img
                  src={carens_chopped}
                  alt="Profile large"
                  className="w-52 h-52 sm:w-64 sm:h-64 rounded object-cover aspect-square"
                  style={{ aspectRatio: "1 / 1" }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}

      <div className="border-2 border-black bg-[#F4D58D] p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className="flex-shrink-0 border-2 border-black mx-auto sm:mx-0 w-24 h-24 sm:w-20 sm:h-20 lg:w-24 lg:h-24 overflow-hidden cursor-pointer"
            onClick={() => {
              setShowVideo((prev) => !prev);
              setShowPicPopup(true);
            }}
            onMouseEnter={() => setShowPicPopup(true)}
            onMouseLeave={() => setShowPicPopup(false)}
            tabIndex={0}
            aria-label="Show Profile Picture"
          >
            {showVideo ? (
              <video
                src={animatedPfp}
                className="w-full h-full object-cover scale-110"
                style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                autoPlay
                muted
                playsInline
                onEnded={() => setShowVideo(false)}
              />
            ) : (
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
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center mb-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mr-0 sm:mr-3">
                Aditya Karanwal
              </h2>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <a
                  href="https://www.linkedin.com/in/aditya--karanwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <FaLinkedin size={14} className="sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://leetcode.com/u/aditya_karanwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100"
                >
                  <SiLeetcode size={14} className="sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://github.com/karanwal123"
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
              Hey there! I’m Aditya Karanwal, a 4th-year CSE student who loves
              building projects and diving into hackathons that push creativity
              and problem-solving. I have a deep appreciation for typography and
              design, and I’m always drawn to things that blend tech with
              aesthetics. Beyond the screen, you’ll often find me trekking
              through trails, watching Formula 1, or unwinding with some anime.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 lg:px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 w-full sm:w-auto text-sm sm:text-base text-center"
              >
                Download Resume
              </a>
              <a
                href="https://dog-zone-ebf.notion.site/About-me-173c0f234b3e80688bbbfd1570fa7b41"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 lg:px-6 py-2 border-2 border-black font-semibold hover:bg-gray-100 w-full sm:w-auto text-sm sm:text-base text-center"
              >
                Notion
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// Work Experience Card Components (split for grid layout)
const ShikshaLokamCard = () => {
  const [showSlLogoPopup, setShowSlLogoPopup] = useState(false);

  return (
    <>
      {/* Popup Logo Window — ShikshaLokam */}
      {showSlLogoPopup && (
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
              <span className="text-xs">ShikshaLokam Logo</span>
              <button
                onClick={() => setShowSlLogoPopup(false)}
                className="px-2 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa]"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-white p-4">
              <img
                src={shikshaLogo}
                alt="ShikshaLokam Logo Large"
                className="w-52 h-52 sm:w-64 sm:h-64 object-contain"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="border-2 border-black bg-[#F8F8F8] p-3 sm:p-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setShowSlLogoPopup(true)}
            onMouseEnter={() => setShowSlLogoPopup(true)}
            onMouseLeave={() => setShowSlLogoPopup(false)}
            tabIndex={0}
            aria-label="Show ShikshaLokam Logo"
          >
            <img
              src={shikshaLogo}
              alt="ShikshaLokam Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-0.5">
              Product Intern
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-0.5">
              ShikshaLokam
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              Mar - Aug 2026
            </p>
          </div>
          <a
            href="https://shikshalokam.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 flex-shrink-0 inline-flex"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <p className="text-sm sm:text-base leading-relaxed">
          At ShikshaLokam, I got to own the frontend of Chanakya ~ an AI
          classroom assistant reaching 150+ schools and teaching organisations.
          I helped shape a production-grade AI advisor, wiring up LangGraph
          orchestration and RAG-based retrieval under the hood. Over the course
          of my internship, I shipped 10+ features end-to-end, working closely
          with product and engineering across a microfrontend architecture.
        </p>
      </div>
    </>
  );
};

const TravelBuddyCard = () => {
  const [showLogoPopup, setShowLogoPopup] = useState(false);

  return (
    <>
      {/* Popup Logo Window — Travel Buddy */}
      {showLogoPopup && (
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
              <span className="text-xs">Travel Buddy Logo</span>
              <button
                onClick={() => setShowLogoPopup(false)}
                className="px-2 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa]"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-white p-4">
              <img
                src={tbdLogo}
                alt="Travel Buddy Logo Large"
                className="w-52 h-52 sm:w-64 sm:h-64 object-contain"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="border-2 border-black bg-[#F8F8F8] p-3 sm:p-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setShowLogoPopup(true)}
            onMouseEnter={() => setShowLogoPopup(true)}
            onMouseLeave={() => setShowLogoPopup(false)}
            tabIndex={0}
            aria-label="Show Travel Buddy Logo"
          >
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
            href="https://beatravelbuddy.com/community"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 flex-shrink-0 inline-flex"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <p className="text-sm sm:text-base leading-relaxed">
          While at Travel Buddy as a 2-month intern, I was actively involved in
          building a social travel platform that connected over 310K+ active
          travelers. I worked on crafting core user experiences — from a smooth
          group management interface and intuitive trip booking flow with smart
          filters, to an Instagram-style visual feed that brought every journey
          to life.
        </p>
      </div>
    </>
  );
};

// Education Card Component
const EducationCard = () => {
  const [showLogoPopup, setShowLogoPopup] = useState(false);

  return (
    <>
      {/* Popup Logo Window */}
      {showLogoPopup && (
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
              <span className="text-xs">LNM Institute Logo</span>
              <button
                onClick={() => setShowLogoPopup(false)}
                className="px-2 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa]"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-white p-4">
              <img
                src={lnm}
                alt="LNM Institute Logo Large"
                className="w-52 h-52 sm:w-64 sm:h-64 object-contain"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="border-2 border-black bg-[#F8F8F8] p-3 sm:p-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setShowLogoPopup(true)}
            onMouseEnter={() => setShowLogoPopup(true)}
            onMouseLeave={() => setShowLogoPopup(false)}
            tabIndex={0}
            aria-label="Show LNM Institute Logo"
          >
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
        </div>

        <p className="text-sm sm:text-base leading-relaxed">
          Pursuing Bachelor's degree in Computer Science Engineering with focus
          on software development, data structures, algorithms, and web
          technologies. Active participant in coding competitions and
          hackathons.
        </p>
      </div>
    </>
  );
};

// View From Window — Cinematic Video Frame
const ViewFromWindowCard = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const userPausedRef = useRef(false);

  // IntersectionObserver: lazy-load + auto-pause when off-screen
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading video when near viewport
          if (!hasLoaded) {
            video.src = delhiMetroVideo;
            video.load();
            setHasLoaded(true);
          }
          // Auto-play only if user hasn't manually paused
          if (!userPausedRef.current) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        } else {
          // Pause when scrolled away to save resources
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasLoaded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      userPausedRef.current = true;
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        userPausedRef.current = false;
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <div ref={containerRef} className="border-2 border-black bg-[#c0c0c0] shadow-[4px_4px_0_0_#000]">
      {/* Windows XP-style Title Bar */}
      <div className="bg-[#000080] px-2 py-1 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="text-xs">▶</span>
          <span className="text-xs sm:text-sm select-none font-medium tracking-wide">
            view_from_my_window.mp4
          </span>
        </div>
        <div className="flex gap-1">
          <button className="px-1.5 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa] text-xs leading-none">
            _
          </button>
          <button className="px-1.5 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa] text-xs leading-none">
            □
          </button>
          <button className="px-1.5 bg-[#c0c0c0] text-black border border-black hover:bg-[#ddd] active:bg-[#aaa] text-xs leading-none">
            ✕
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full h-40 sm:h-52 lg:h-[420px] object-cover object-center"
          preload="none"
          loop
          muted
          playsInline
        />

        {/* Combined VHS scanlines + vignette overlay (single DOM node) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
            opacity: 0.06,
            boxShadow: "inset 0 0 60px rgba(0,0,0,6.5)",
          }}
        />
      </div>

      {/* Retro Media Player Controls Bar */}
      <div className="bg-[#c0c0c0] px-2 py-1.5 flex items-center gap-2 border-t border-[#808080]">
        <button
          onClick={togglePlay}
          className="px-2 py-0.5 border-t border-l border-white border-r border-b border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#d4d4d4] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white text-xs font-bold"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="px-2 py-0.5 border-t border-l border-white border-r border-b border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#d4d4d4] text-xs font-bold">
          ⏹
        </button>

        {/* Progress bar — pure CSS animation, no JS repaints */}
        <div className="flex-1 h-3 bg-[#000080] border border-[#808080] relative overflow-hidden">
          <div
            className="h-full bg-[#00ff00]"
            style={{
              animation: isPlaying ? "retro-progress 15s linear infinite" : "none",
              width: isPlaying ? undefined : "0%",
            }}
          />
        </div>

        <span className="text-[10px] sm:text-xs text-gray-600 select-none font-mono whitespace-nowrap">
          delhi metro ✦ I love my K-town
        </span>
      </div>
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

const HackathonsPage = () => {
  const hackathons = [
    {
      name: "ShikshaLokam Hackathon",
      achievement: "Winner",
      description:
        "Emerged as the winner of this national-level hackathon among 2,897+ registrations.",
      color: "bg-[#FFE7A0]",
      participants: "2,897+ registrations",
    },
    {
      name: "HackJKLU v5.0 (2026)",
      achievement: "Winner",
      description:
        "Emerged as the winner of this hackathon among 2,897+ registrations.",
      color: "bg-[#CFEBDF]",
      participants: "1000+ Participants",
    },
    {
      name: "Capital One Launchpad 2025",
      achievement: "Finalist (Top 14)",
      description:
        "Out of 4000+ teams (5073 participants), our team was selected among the Top 14 Finalists at the Capital One Launchpad, Bangalore.",
      color: "bg-[#E8F4FD]",
      participants: "5,073 participants",
    },
    {
      name: "Open Gateway Hackathon (IMC'25)",
      achievement: "Finalist (Top 10)",
      description:
        "Selected among top 10 teams out of 2345 participants for the prestigious Open Gateway Hackathon powered by GSMA and Nokia.",
      color: "bg-[#F3D1FF]",
      participants: "2,345 participants",
    },
    {
      name: "Hackstreet 3.0 (2025)",
      achievement: "1st Place",
      description:
        "Secured 1st Place with team in hackathon organized by IEEE at JIIT Noida.",
      color: "bg-[#BDD7FF]",
      participants: "IEEE JIIT Noida",
    },
    {
      name: "HackJKLU v4.0 (2025)",
      achievement: "4th Place",
      description:
        "Secured 4th Place with team in a hackathon organized by JK Lakshmipat University, Jaipur, competing against 180+ teams.",
      color: "bg-[#FFF3CD]",
      participants: "180+ teams",
    },
    {
      name: "GO-BRICS India-Russia Energy-o-thon 2026",
      achievement: "Semifinalist (Top 60)",
      description:
        "Reached the semifinals, finishing in the Top 60 out of 17,000+ participants in this international India-Russia energy innovation challenge.",
      color: "bg-[#CFEBDF]",
      participants: "17,000+ participants",
    },
    {
      name: "AdventureX China",
      achievement: "International Delegate",
      description:
        "Selected as an International Delegate with a travel subsidy awarded, representing India at AdventureX China.",
      color: "bg-[#E8F4FD]",
      participants: "International Event",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
          Hackathons
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          My hackathon achievements and competitions
        </p>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
        {hackathons.map((hackathon, index) => (
          <div
            key={index}
            className={`flex flex-col border-2 border-black ${hackathon.color} p-3 lg:p-4`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                  {hackathon.name}
                </h2>
                <p className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  {hackathon.achievement}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="px-2 py-0.5 text-[10px] sm:text-xs border border-black bg-white whitespace-nowrap">
                Participants: {hackathon.participants}
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              {hackathon.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DesignsPage = () => {
  const designPortfolioUrl = "https://possible-grasshopper.super.site/";

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Designs</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Wohoooooo
        </p>
      </div>

      <div className="border-2 border-black bg-white p-2 sm:p-3">
        <iframe
          src={designPortfolioUrl}
          title="Aditya design portfolio"
          className="w-full h-[68vh] sm:h-[74vh] lg:h-[80vh] border-2 border-black bg-white"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="mt-3 flex justify-end">
          <a
            href={designPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border-2 border-black bg-white font-semibold hover:bg-gray-100 text-xs sm:text-sm"
          >
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
