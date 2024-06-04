import React, { Fragment, useContext, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { EditorContent, BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DataContext, contextProps, dataProps } from "../../context";

type colorProps = {
  color: string;
}[];

const colors: colorProps = [
  {
    color: "#f8f4c8",
  },
  {
    color: "#C8F8CD",
  },
  {
    color: "#f8c8c8",
  },
  {
    color: "#dcc8f8",
  },
  {
    color: "#edede4",
  },
];

const Modal: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({
  isOpen,
  closeModal,
}) => {
  const [popupColor, setPopupColor] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const { data, addTodo, newData, setNewData } =
    useContext<contextProps>(DataContext);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "px-4 py-2 rounded bg-white outline-none border mt-2",
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setSelectedColor(randomColor.color);
    } else {
      setSelectedColor("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(editor?.getHTML());
    addTodo({
      id: data.length + 1,
      title: newData.title,
      time: newData.time,
      date: newData.date,
      description: editor?.getHTML() || "",
      createdAt: new Date().toISOString(),
      color: selectedColor,
    });
    setNewData({} as dataProps);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="font-figtree w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Tambah Aktivitas ✏️
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <div className="my-2 flex gap-1">
                    <button
                      type="button"
                      className="h-5 w-5 rounded-full border-2 border-transparent hover:border-black cursor-pointer"
                      onClick={() => setPopupColor(!popupColor)}
                      style={{ backgroundColor: selectedColor }}
                    />
                    {popupColor ? (
                      <div className="flex gap-1">
                        {colors.map((color, i) => (
                          <button
                            type="button"
                            style={{ backgroundColor: color.color }}
                            key={i}
                            className={`h-5 w-5 rounded-full border-2 border-transparent hover:border-black cursor-pointer`}
                            onClick={() => {
                              setNewData({ ...newData, color: color.color });
                              setPopupColor(!popupColor);
                            }}
                            onMouseEnter={() => setSelectedColor(color.color)}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-2 flex flex-col gap-3">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Judul kegiatan
                      </label>

                      <input
                        type="text"
                        id="title"
                        placeholder="Nama ketigatanmu!"
                        onChange={(e) =>
                          setNewData({ ...newData, title: e.target.value })
                        }
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="w-full">
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Waktu
                        </label>

                        <input
                          type="time"
                          id="time"
                          onChange={(e) =>
                            setNewData({ ...newData, time: e.target.value })
                          }
                          className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tanggal
                        </label>

                        <input
                          type="date"
                          id="date"
                          onChange={(e) =>
                            setNewData({ ...newData, date: e.target.value })
                          }
                          className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="block text-sm font-medium text-gray-700">
                        Deskripsi
                      </p>
                      <>
                        {editor && (
                          <BubbleMenu
                            editor={editor}
                            tippyOptions={{ duration: 100 }}
                          >
                            <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
                              <button
                                onClick={() =>
                                  editor.chain().focus().toggleBold().run()
                                }
                                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                              >
                                <span
                                  className={
                                    editor.isActive("bold")
                                      ? "is-active font-bold"
                                      : "text-gray-400 font-bold"
                                  }
                                >
                                  B
                                </span>
                              </button>

                              <button
                                onClick={() =>
                                  editor.chain().focus().toggleItalic().run()
                                }
                                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                              >
                                <span
                                  className={
                                    editor.isActive("italic")
                                      ? "is-active italic"
                                      : "italic text-gray-400"
                                  }
                                >
                                  I
                                </span>
                              </button>

                              <button
                                onClick={() =>
                                  editor.chain().focus().toggleStrike().run()
                                }
                                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
                              >
                                <span
                                  className={
                                    editor.isActive("strike")
                                      ? "is-active line-through"
                                      : "line-through text-gray-400"
                                  }
                                >
                                  S
                                </span>
                              </button>
                            </span>
                          </BubbleMenu>
                        )}
                        <EditorContent editor={editor} />
                      </>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 text-black px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
