const Navbar: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 mt-0 sm:mt-2 w-full sm:max-w-screen-lg transition-all">
      <div className="flex justify-between items-center gap-3 p-3 shadow rounded-none sm:rounded-lg bg-white">
        <h1 className="text-xl font-semibold">
          Todo <span className="text-slate-400">list</span>
        </h1>

        <button
          onClick={openModal}
          className="group relative inline-flex items-center overflow-hidden rounded bg-black px-8 py-2 text-white focus:outline-none focus:ring active:bg-zinc-800"
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Add
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
