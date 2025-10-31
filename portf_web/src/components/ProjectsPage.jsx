import React from "react";
import { Github } from "lucide-react";
import carens_chopped from "../assets/carens_chopped.png";
import portf_plan_it from "../assets/portf_plan_it.png";
//portf_web\src\assets\portf_plan_it.png
const ProjectsPage = () => {
  const projects = [
    {
      name: "Plan-it",
      subtitle: "Personal Project",
      description:
        " Smart multi-stop route planner featured on Google Maps Platform Awards 2025, using Google Maps API and custom TSP heuristics (2-opt/simulated annealing) to optimize unlimited waypoints. Implemented Google OAuth/JWT authentication, interactive maps, real-time metrics, weather integration, and PDF exports. Technologies: React.js, Node.js, Express.js, MongoDB, Google Maps API, TailwindCSS",
      github: "https://github.com/karanwal123/plan-it-clean",
      image: "/src/assets/portf_plan_it.png", // Replace with your image path
    },
    {
      name: "KisanMitra",
      subtitle: "Capital One Launchpad",
      description:
        "  Next-generation multilingual AI assistant empowering Indian farmers with context-aware intelligence powered by Google Gemini Pro, LangChain, and FastAPI. Designed a dual-memory system blending real-time context with persistent personalization, integrated RAG search via FAISS, and orchestrated modular tools for weather, crop diagnostics, and market insights. This project was selected from 4000+ submissions for Capital One Launchpad in Bangalore, showcasing its innovation and impact. ",
      github: "https://github.com/yourusername/project2",
      image: "/src/assets/project2.png", // Replace with your image path
    },
    {
      name: "Shrinkify",
      subtitle: "@Startup Inc",
      description:
        "URL shortening service was developed with custom slug support and integrated click analytics. The system included secure authentication using JWT tokens and bcrypt password hashing, alongside a responsive web application with real-time validation and error handling. A RESTful API with protected routes and comprehensive error management was implemented, with Redux Toolkit and async thunks used for efficient state management.",
      github: "https://github.com/yourusername/project3",
      image: "/src/assets/project3.png", // Replace with your image path
    },
    {
      name: "Project Four",
      subtitle: "@Tech Solutions",
      description:
        "A brief description of project four. Explain the key features and technologies used in the project. Implemented with cutting-edge technology stack.",
      github: "https://github.com/yourusername/project4",
      image: "/src/assets/project4.png", // Replace with your image path
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5E6D3] p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
        Projects
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#ECF1FF] border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left side - Text content */}
              <div className="w-full md:w-2/5 p-4 sm:p-6 border-b-2 sm:border-b-4 md:border-b-0 md:border-r-2 sm:md:border-r-4 border-black">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black bg-white flex-shrink-0"></div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">
                      {project.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {project.description}
                </p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                >
                  <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              </div>

              {/* Right side - Image */}
              <div className="w-full md:w-3/5 h-48 sm:h-64 md:h-auto min-h-[250px] md:min-h-[300px] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
