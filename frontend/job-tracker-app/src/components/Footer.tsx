import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { getAppVersion } from "@/utils/version";



export function Footer() {
  const version = getAppVersion();
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center">
        Build Version: {version}
      </span>

      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li className="me-4 md:me-6">
          <a
            href="https://github.com/prasnitt/JobTracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <FaSquareGithub size={18} />
            GitHub Repo
          </a>
        </li>
        <li className="me-4 md:me-6">
          <a
            href="https://www.linkedin.com/in/prasnitt/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <FaLinkedin size={18} />
            About Me
          </a>
        </li>
      </ul>
    </footer>
  );
}
