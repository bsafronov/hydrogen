import { create } from "zustand";

export type ModalStoreSelectors = {
  admin: boolean;
};

export type ModalStoreActions = {
  toggleAdmin: () => void;
};

type Props = ModalStoreSelectors & ModalStoreActions;

export const useModalStore = create<Props>()((set, get) => ({
  admin: false,
  toggleAdmin: () => set({ admin: !get().admin }),
}));
