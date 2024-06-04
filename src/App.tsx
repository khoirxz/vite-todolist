import { useState, useContext } from "react";
import { Navbar, Card, Modal } from "./components";
import { contextProps, DataContext } from "./context";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useContext<contextProps>(DataContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="font-figtree text-[#222] bg-gradient-to-br bg-[#F5F5F5] relative min-h-screen">
      <Navbar openModal={openModal} />

      <Modal isOpen={isOpen} closeModal={closeModal} />

      <main className="pt-32 px-4 flex flex-col gap-3 sm:px-0 md:px-4 mx-auto w-full sm:max-w-screen-sm md:max-w-screen-lg min-h-screen">
        <h1 className="text-xl font-bold">Your Activities ✨</h1>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data?.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                time={item.time}
                date={item.date}
                color={item.color}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 text-center">
            <p className="text-3xl font-bold text-gray-300">No data</p>
          </div>
        )}
      </main>

      <footer className="pt-5 border-t">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
          <div className="sm:flex items-center">
            <p className="mt-2 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              👀 on <a href="https://github.com/adekunleadekunle">GitHub</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
