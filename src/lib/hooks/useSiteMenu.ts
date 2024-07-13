import { MenuItem } from "@/app/(dashboard)/header-menu/menuForm";
import { create } from "zustand";

interface Store {
  menuItems: MenuItem[];
  setMenuItems: (val: MenuItem[] | ((prev: MenuItem[]) => MenuItem[])) => void;
}

const useSiteMenu = create<Store>((set) => ({
  menuItems: [],
  setMenuItems: (val) =>
    set((state) => ({
      menuItems: typeof val === "function" ? val(state.menuItems) : val,
    })),
}));

export default useSiteMenu;
