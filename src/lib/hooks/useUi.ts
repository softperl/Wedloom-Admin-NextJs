import { create } from "zustand";

interface Store {
  refreash: boolean;
  setRefreash: (val: boolean) => void;
}

const useUi = create<Store>((set) => ({
  refreash: true,
  setRefreash: (val: boolean) => set(() => ({ refreash: val })),
}));

export default useUi;
