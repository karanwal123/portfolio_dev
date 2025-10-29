import React from "react";
import { FaGithub } from "react-icons/fa";

const ProjectsPage = () => {
  const projects = [
    {
      name: "Project One",
      image: "https://placehold.co/640x360",
      description:
        "A brief description of project one. Explain the key features and technologies used in the project.",
      github: "https://github.com/yourusername/project1",
    },
    {
      name: "Project Two",
      image: "https://placehold.co/640x360",
      description:
        "A brief description of project two. Explain the key features and technologies used in the project.",
      github: "https://github.com/yourusername/project2",
    },
    {
      name: "Project Three",
      image: "https://placehold.co/640x360",
      description:
        "A brief description of project three. Explain the key features and technologies used in the project.",
      github: "https://github.com/yourusername/project3",
    },
    {
      name: "Project Four",
      image: "https://placehold.co/640x360",
      description:
        "A brief description of project four. Explain the key features and technologies used in the project.",
      github: "https://github.com/yourusername/project4",
    },
    {
      name: "Project Five",
      image: "https://placehold.co/640x360",
      description:
        "A brief description of project five. Explain the key features and technologies used in the project.",
      github: "https://github.com/yourusername/project5",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-4 border-black bg-[#F8F8F8] rounded-xl p-3 sm:p-4 lg:p-6 hover:transform hover:scale-[1.02] transition-transform"
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">{project.name}</h2>

            {/* Project Image with 16:9 ratio */}
            <div className="relative w-full pb-[56.25%] mb-3 sm:mb-4 border-2 border-black overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Github Link */}
            <div className="flex justify-end">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-100"
              >
                <FaGithub size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
