import React from "react";

const books = [
  {
    title: "Atomic Habits",
    color: "#D4A574",
    url: "https://example.com/atomic-habits",
  },
  {
    title: "Your Name",
    color: "#A8C4E6",
    url: "https://example.com/your-name",
  },
  {
    title: "Essentialism: The Disciplined Pursuit of Less",
    color: "#B8D4A8",
    url: "https://example.com/essentialism",
  },
  {
    title: "The Art of Laziness",
    color: "#E6B8C4",
    url: "https://example.com/art-of-laziness",
  },
  {
    title: "Library Mindset",
    color: "#D4B8E6",
    url: "https://example.com/library-mindset",
  },
  {
    title: "The Design of Everyday Things",
    color: "#E6D4A8",
    url: "https://example.com/design-everyday-things",
  },
];

const Shelf = ({ children }) => (
  <div className="relative w-full px-2 sm:px-6">
    <div className="flex gap-3 sm:gap-5 justify-center flex-wrap pb-6 relative">
      {children}
    </div>
    <div className="h-3 bg-[#654321] border-2 border-black w-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
      <div className="h-1 bg-[#8B6F47]"></div>
    </div>
  </div>
);

const RetroBook = ({ title, color, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-20 sm:w-24 h-28 sm:h-32 border-3 border-black flex items-center justify-center text-center px-2 shadow-[3px_3px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000] transition-all cursor-pointer relative"
    style={{
      backgroundColor: color,
      borderWidth: "3px",
    }}
  >
    <span
      className="text-[9px] sm:text-[11px] font-black leading-tight select-none uppercase tracking-tight"
      style={{ fontFamily: "monospace" }}
    >
      {title}
    </span>
    {/* Book spine detail */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black opacity-20"></div>
  </a>
);

const BooksPage = () => {
  return (
    <div
      className="min-h-screen bg-[#F5E6D3] py-8 px-4"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }}
    >
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2 text-black tracking-tight"
          style={{ fontFamily: "monospace", textShadow: "3px 3px 0 #FFD700" }}
        >
          MY BOOKSHELF
        </h1>
        <p
          className="text-sm sm:text-base mb-8 font-bold tracking-wide"
          style={{ fontFamily: "monospace" }}
        >
          ≈ Books that shaped my thinking ≈
        </p>

        <div className="w-full border-4 border-black bg-[#FFF8E7] p-6 sm:p-10 shadow-[8px_8px_0_0_#000] relative">
          <div className="mb-8">
            <Shelf>
              {books.slice(0, 3).map((b) => (
                <RetroBook
                  key={b.title}
                  title={b.title}
                  color={b.color}
                  url={b.url}
                />
              ))}
            </Shelf>
          </div>

          {/* Bottom shelf: no cat here but you can enable it by passing `withCat` and a custom `catPosition` */}
          <Shelf>
            {books.slice(3).map((b) => (
              <RetroBook
                key={b.title}
                title={b.title}
                color={b.color}
                url={b.url}
              />
            ))}
          </Shelf>

          {/* Decorative corner marks */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-4 border-t-4 border-black"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-4 border-t-4 border-black"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-4 border-b-4 border-black"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-4 border-b-4 border-black"></div>
        </div>

        <div
          className="mt-6 text-xs sm:text-sm font-bold text-black text-center border-2 border-black bg-yellow-200 px-4 py-2 shadow-[4px_4px_0_0_#000]"
          style={{ fontFamily: "monospace" }}
        >
          ★ {books.length} BOOKS ★ CLICK TO EXPLORE ★
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
