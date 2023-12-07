import { create } from "zustand";

export type ModalStoreSelectors = {
  admin: boolean;
  login: boolean;
};

export type ModalStoreActions = {
  toggleAdmin: () => void;
  toggleLogin: () => void;
};

type Props = ModalStoreSelectors & ModalStoreActions;

export const useModalStore = create<Props>()((set, get) => ({
  admin: false,
  toggleAdmin: () => set({ admin: !get().admin }),
  login: false,
  toggleLogin: () => set({ login: !get().login }),
}));
