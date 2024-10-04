import React from "react";
import Navbar from "./components/Navbar";
import ConversionCard from "./components/ConversionCard";

const App = () => {
  return (
    <div className="  max-w-[480px] m-auto ">
      {/* <Navbar /> */}
      <ConversionCard />

      <div className="logo font-oswald font-semibold text-sm text-[#76b44f] flex flex-col justify-center items-center pb-6">
        {/* Logo on one line */}
        <div className="flex justify-center items-center mb-2">
          <span className="material-symbols-outlined inline-block pr-1 text-[#9fe870]">
            select_all
          </span>
          <span className="text-[#9fe870]">MONO</span>
          <span>TOOLS.</span>
        </div>

        {/* Name on another line */}
        <p className="font-sourceSans text-center mb-1 text-[12.5px]">
          Developed by Mohammad Jamiu
        </p>

        {/* GitHub link on the last line */}
        <a
          href="https://github.com/Mohammadjamiu"
          target="_blank"
          className="flex items-center justify-center mt-1 text-[#76b44f] hover:text-[#9fe870]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-1"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.513 11.513 0 0 1 3.004-.404c1.02.005 2.047.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.653.241 2.873.118 3.176.768.84 1.234 1.911 1.234 3.221 0 4.61-2.804 5.623-5.475 5.921.43.37.823 1.102.823 2.222 0 1.605-.015 2.897-.015 3.293 0 .322.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.385 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="font-sourceSans text-[12.5px]">GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default App;
