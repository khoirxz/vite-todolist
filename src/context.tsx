import { createContext, ReactNode, useState, useEffect } from "react";

type dataProps = {
  id: number;
  title: string;
  time: string;
  date: string;
  description: string;
  createdAt: string;
  color: string;
}[];

export type contextProps = {
  data: dataProps;
  setData: React.Dispatch<React.SetStateAction<dataProps>>;
};

const DataContext = createContext<contextProps>({
  data: [],
  setData: () => {},
});

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<dataProps>(() => {
    const data = localStorage.getItem("data");

    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
