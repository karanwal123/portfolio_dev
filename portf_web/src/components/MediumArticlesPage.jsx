import React from "react";
import { ExternalLink } from "lucide-react";

// Medium Articles Page Component
const MediumArticlesPage = () => {
  const articles = [
    {
      title:
        "Trip Planning Shouldn't Feel Like Labour: Here's the App I Built to Fix It",
      description:
        "How I built a web application that helps users plan their trips more efficiently, covering frontend design, backend architecture, and deployment strategies. Learn about the challenges faced and lessons learned along the way.",
      url: "https://medium.com/@adityakaranwal/trip-planning-shouldnt-feel-like-labour-here-s-the-app-i-built-to-fix-it-468aab72d91b",
      color: "#FFE7A0",
    },
    {
      title: "Calorie Burn Predictor 🔥",
      description:
        "Ever wondered exactly how many calories you torch during your gym session? I built a web application that helps users predict their calorie burn based on their activity.",
      url: "https://medium.com/@adityakaranwal/calorie-burn-predictor-44422b7ef9f6",
      color: "#E8F4FD",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
        Medium Articles
      </h1>
      <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-gray-700">
        My thoughts and experiences on development, design, and technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-black bg-white hover:shadow-[4px_4px_0_0_#000] transition-all cursor-pointer group"
          >
            <div
              className="h-32 sm:h-40 w-full border-b-2 border-black"
              style={{ backgroundColor: article.color }}
            ></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold flex-1 pr-2 group-hover:underline">
                  {article.title}
                </h2>
                <ExternalLink
                  size={20}
                  className="flex-shrink-0 text-gray-600 group-hover:text-black transition-colors"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {article.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MediumArticlesPage;
