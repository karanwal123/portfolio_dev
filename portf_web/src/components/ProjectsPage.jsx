import React, { useState } from "react";
import { Github, ExternalLink } from "lucide-react";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: "Plan-it",
      subtitle: "Personal Project",
      description:
        "Smart multi-stop route planner featured on Google Maps Platform Awards 2025, using Google Maps API and custom TSP heuristics (2-opt/simulated annealing) to optimize unlimited waypoints. Implemented Google OAuth/JWT authentication, interactive maps, real-time metrics, weather integration, and PDF exports.",
      github: "https://github.com/karanwal123/plan-it-clean",
      color: "bg-[#FFE7A0]",
      date: "11/02/25",
      type: "Personal Project",
      technologies: ["React JS", "Google Maps API", "Node.js", "JWT", "TSP"],
    },
    {
      name: "KisanMitra",
      subtitle: "Capital One Launchpad",
      description:
        "Next-generation multilingual AI assistant empowering Indian farmers with context-aware intelligence powered by Google Gemini Pro, LangChain, and FastAPI. Designed a dual-memory system blending real-time context with persistent personalization, integrated RAG search via FAISS, and orchestrated modular tools for weather, crop diagnostics, and market insights.",
      github: "https://github.com/yourusername/project2",
      color: "bg-[#E8F4FD]",
      date: "08/15/24",
      type: "Capital One Launchpad",
      technologies: [
        "Python",
        "FastAPI",
        "LangChain",
        "Google Gemini Pro",
        "FAISS",
      ],
    },
    {
      name: "Shrinkify",
      subtitle: "Personal Project",
      description:
        "URL shortening service with custom slug support and integrated click analytics. The system includes secure authentication using JWT tokens and bcrypt password hashing, alongside a responsive web app with real-time validation and error handling. A RESTful API with protected routes and comprehensive error management was implemented.",
      github: "https://github.com/yourusername/project3",
      color: "bg-[#F3D1FF]",
      date: "05/20/24",
      type: "Personal Project",
      technologies: ["React JS", "Node.js", "MongoDB", "JWT", "Express"],
    },
    {
      name: "Free3Lance",
      subtitle: "Hackathon Project",
      description:
        "Freelance marketplace platform connecting clients with skilled professionals. Built with modern web technologies featuring real-time messaging, secure payment integration, project management tools, and user rating systems.",
      github: "https://github.com/yourusername/project4",
      color: "bg-[#BDD7FF]",
      date: "03/10/24",
      type: "Hackathon Project",
      technologies: [
        "React JS",
        "Socket.io",
        "Stripe",
        "PostgreSQL",
        "Node.js",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
          Projects
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          A collection of projects I've built
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`flex flex-col border-2 border-black ${project.color} p-3 lg:p-4 cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">
                  {project.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  {project.subtitle}
                </p>
              </div>
              <ExternalLink
                size={18}
                className="flex-shrink-0 text-gray-600 hover:text-black transition-colors"
              />
            </div>

            {/* Small Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="px-2 py-0.5 text-[10px] sm:text-xs border border-black bg-white whitespace-nowrap">
                Date: {project.date}
              </div>
              <div className="px-2 py-0.5 text-[10px] sm:text-xs border border-black bg-white whitespace-nowrap">
                Type: {project.type}
              </div>
              <div className="px-2 py-0.5 text-[10px] sm:text-xs border border-black bg-white">
                Tech: {project.technologies.slice(0, 2).join(", ")}
                {project.technologies.length > 2 &&
                  " +" + (project.technologies.length - 2) + " more"}
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 animate-fadeIn"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className={`pointer-events-auto w-full max-w-2xl bg-white border-2 border-black animate-popIn max-h-[90vh] flex flex-col ${selectedProject.color}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b-2 border-black flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
                      {selectedProject.name}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <span className="text-xl">✕</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 lg:p-6 flex-1 overflow-y-auto retro-scrollbar">
                {/* Tags in Modal */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-2 py-0.5 text-xs border border-black bg-white whitespace-nowrap">
                    Date: {selectedProject.date}
                  </div>
                  <div className="px-2 py-0.5 text-xs border border-black bg-white whitespace-nowrap">
                    Type: {selectedProject.type}
                  </div>
                  <div className="px-2 py-0.5 text-xs border border-black bg-white">
                    Tech: {selectedProject.technologies.join(", ")}
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t-2 border-black">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors"
                  >
                    <Github size={18} />
                    <span className="text-sm sm:text-base font-medium">
                      View Code
                    </span>
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 transition-colors text-sm sm:text-base font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Styles and Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-popIn {
          animation: popIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
