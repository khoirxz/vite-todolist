import { Popover, Transition } from "@headlessui/react";

type cardProps = {
  title: string;
  time: string;
  date: string;
  color: string;
};

const Card: React.FC<cardProps> = ({ title, time, date, color }) => {
  return (
    <div>
      <div
        style={{ backgroundColor: color }}
        className={`cursor-pointer py-3 px-4 rounded-2xl flex flex-col gap-6 relative`}
      >
        <span className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-zinc-700">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="font-bold">{date}</p>
          </div>
          <div>
            <Popover>
              <Popover.Button
                className={"text-zinc-700 rounded-full hover:bg-white/15"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Popover.Button>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 bg-white -translate-x-1/2 rounded-md shadow-sm flex flex-col py-3">
                  <span className="hover:bg-zinc-600/25 px-3 py-1">
                    <button role="menuitem" className="text-zinc-700">
                      Selesai
                    </button>
                  </span>
                  <span className="hover:bg-zinc-600/25 px-3 py-1">
                    <button role="menuitem" className="text-zinc-700">
                      Edit
                    </button>
                  </span>
                  <span className="hover:bg-zinc-600/25 px-3 py-1">
                    <button role="menuitem" className="text-red-500 font-bold">
                      Hapus
                    </button>
                  </span>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </span>
        <h1 className="text-5xl sm:text-3xl md:text-4xl font-thin">{title}</h1>
        <p className="text-zinc-700 font-semibold">{time}</p>
      </div>
      <CardModal />
    </div>
  );
};

const CardModal = () => {
  return (
    <>
      <div>Hello World</div>
    </>
  );
};

export default Card;
