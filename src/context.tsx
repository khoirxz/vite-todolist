import { createContext, ReactNode, useState, useEffect } from "react";
import { openDB } from "idb";
import { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } from "./constant";

export type dataProps = {
  id: number;
  title: string;
  time: string;
  date: string;
  description: string;
  createdAt: string;
  color: string;
};

export type contextProps = {
  data: dataProps[];
  setData: React.Dispatch<React.SetStateAction<dataProps[]>>;
  newData: dataProps;
  setNewData: React.Dispatch<React.SetStateAction<dataProps>>;
  addTodo: (newData: dataProps) => Promise<void>;
};

const DataContext = createContext<contextProps>({
  data: [],
  setData: () => {},
  newData: {} as dataProps,
  setNewData: () => {},
  addTodo: async () => {},
});

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<dataProps[]>([]);
  const [newData, setNewData] = useState<dataProps>({} as dataProps);

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
        upgrade(db) {
          db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
        },
      });

      const tx = db.transaction(OBJECT_STORE_NAME, "readonly");
      const store = tx.objectStore(OBJECT_STORE_NAME);
      const req = store.getAll();
      const dataFromIndexed = await req;
      if (dataFromIndexed.length === 0) {
        setData([]);
      }

      setData(dataFromIndexed);
    };

    initDB();
  }, [data]);

  const addTodo = async (newData: dataProps) => {
    const { id, title, time, date, description, createdAt, color } = newData;

    const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      },
    });

    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    const store = tx.objectStore(OBJECT_STORE_NAME);
    store.add({
      id,
      title,
      time,
      date,
      description,
      createdAt,
      color,
    });
  };

  return (
    <DataContext.Provider
      value={{ data, setData, newData, setNewData, addTodo }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
