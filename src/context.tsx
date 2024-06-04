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
  editTodo: (newData: dataProps) => Promise<void>;
  getOneTodo: (id: number) => Promise<void>;
};

const DataContext = createContext<contextProps>({
  data: [],
  setData: () => {},
  newData: {} as dataProps,
  setNewData: () => {},
  addTodo: async () => {},
  editTodo: async () => {},
  getOneTodo: async () => {},
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

  const getOneTodo = async (id: number) => {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      },
    });
    const tx = db.transaction(OBJECT_STORE_NAME, "readonly");
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const req = store.get(id);
    const dataFromIndexed = await req;
    setNewData(dataFromIndexed);
  };

  /**
   * Edits a todo item in the database.
   *
   * @param {dataProps} newData - The new data for the todo item.
   * @return {Promise<void>} A promise that resolves when the todo item is edited.
   */
  const editTodo = async (newData: dataProps) => {
    const { id, title, time, date, description, createdAt, color } = newData;
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      /**
       * Upgrades the database by creating an object store with the given name and key path.
       *
       * @param {IDBDatabase} db - The database object to upgrade.
       */
      upgrade(db) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
      },
    });
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    const store = tx.objectStore(OBJECT_STORE_NAME);
    store.put({
      id,
      title,
      time,
      date,
      description,
      createdAt,
      color,
    });

    setData((old) => old.map((item) => (item.id === id ? newData : item)));

    setNewData({} as dataProps);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        newData,
        setNewData,
        addTodo,
        editTodo,
        getOneTodo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
