import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  User,
  Home,
  Mail,
  Briefcase,
  FolderOpen,
  FileText,
  Coffee,
} from "lucide-react";

const WindowsXPFooter = () => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [wifiOn, setWifiOn] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const menuItems = [
    { icon: Home, label: "Home", color: "bg-black" },
    { icon: User, label: "About Me", color: "bg-gray-800" },
    { icon: Briefcase, label: "Projects", color: "bg-black" },
    { icon: FileText, label: "Resume", color: "bg-gray-800" },
    { icon: Mail, label: "Contact", color: "bg-black" },
    { icon: Coffee, label: "Buy Me Coffee", color: "bg-gray-800" },
  ];

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div className="fixed bottom-12 left-2 w-64 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 animate-in slide-in-from-bottom-4 duration-200">
          {/* Menu Header */}
          <div className="bg-black text-white p-3 border-b-4 border-white flex items-center gap-2">
            <User size={24} className="stroke-[2.5]" />
            <div>
              <div className="font-bold text-sm">Guest User</div>
              <div className="text-xs">Portfolio Navigation</div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 p-3 ${item.color} text-white hover:bg-gray-600 border-2 border-black mb-2 transition-all font-bold text-sm`}
                onClick={() => setStartMenuOpen(false)}
              >
                <item.icon size={20} className="stroke-[2.5]" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="bg-black text-white p-2 border-t-4 border-white text-center text-xs font-bold">
            © 2025 Aditya's Portfolio
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {startMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setStartMenuOpen(false)}
        ></div>
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 transition-all duration-300 z-50 ${
          isCollapsed ? "translate-y-[90%]" : ""
        }`}
        onMouseEnter={() => setIsCollapsed(false)}
      >
        {/* Collapse Indicator */}
        <div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="bg-white border-2 border-black px-3 py-1 shadow-md hover:bg-gray-100 transition-colors">
            <span className="text-xs font-bold">{isCollapsed ? "▲" : "▼"}</span>
          </div>
        </div>

        <footer className="h-12 bg-white border-t-4 border-black flex items-center justify-between px-2 shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
          {/* Start Button */}
          <button
            className="h-9 px-4 bg-black hover:bg-gray-800 text-white font-bold shadow-lg flex items-center gap-2 border-2 border-black transition-all"
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <div className="w-5 h-5 bg-white border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-black"></div>
            </div>
            <span className="text-sm font-bold tracking-wider">START</span>
          </button>

          {/* Middle Section - Quick launch icons */}
          <div className="flex-1 flex items-center gap-2 ml-3">
            <button className="h-9 w-9 bg-white hover:bg-gray-100 flex items-center justify-center border-2 border-black shadow-md transition-all">
              <Home size={18} className="stroke-[2.5]" />
            </button>
            <button className="h-9 w-9 bg-white hover:bg-gray-100 flex items-center justify-center border-2 border-black shadow-md transition-all">
              <FolderOpen size={18} className="stroke-[2.5]" />
            </button>
            <button className="h-9 w-9 bg-white hover:bg-gray-100 flex items-center justify-center border-2 border-black shadow-md transition-all">
              <Mail size={18} className="stroke-[2.5]" />
            </button>

            <div className="h-9 px-4 bg-white hover:bg-gray-100 text-black text-xs font-bold flex items-center gap-2 border-2 border-black cursor-pointer shadow-md transition-all ml-2">
              <User size={16} className="stroke-[2.5]" />
              <span className="font-bold tracking-wide">Guest User</span>
            </div>
          </div>

          {/* System Tray */}
          <div className="flex items-center gap-2 h-9">
            {/* Icons */}
            <div className="flex items-center gap-3 px-3 bg-white border-2 border-black h-full">
              <button
                onClick={() => setWifiOn(!wifiOn)}
                className="hover:opacity-70 transition-opacity"
              >
                {wifiOn ? (
                  <Wifi size={16} className="text-black stroke-[2.5]" />
                ) : (
                  <WifiOff size={16} className="text-black stroke-[2.5]" />
                )}
              </button>
              <button
                onClick={() => setSoundOn(!soundOn)}
                className="hover:opacity-70 transition-opacity"
              >
                {soundOn ? (
                  <Volume2 size={16} className="text-black stroke-[2.5]" />
                ) : (
                  <VolumeX size={16} className="text-black stroke-[2.5]" />
                )}
              </button>
            </div>

            {/* Clock */}
            <div className="px-3 bg-white border-2 border-black h-full flex flex-col justify-center min-w-[100px]">
              <div className="text-black text-xs font-bold leading-tight text-center tracking-tight">
                {formatTime(time)}
              </div>
              <div className="text-black text-[10px] leading-tight text-center font-bold tracking-tight">
                {formatDate(time)}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WindowsXPFooter;
