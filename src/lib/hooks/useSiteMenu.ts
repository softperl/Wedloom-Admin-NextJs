import { create } from "zustand";

interface Store {
  menuPosition: string;
  setMenuPosition: (val: string) => void;
}

const useSiteMenu = create<Store>((set) => ({
  menuPosition: "",
  setMenuPosition: (val) => set({ menuPosition: val }),
}));

export default useSiteMenu;
