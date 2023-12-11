import { create } from "zustand";

export type ModalStoreSelectors = {
  login: boolean;
};

export type ModalStoreActions = {
  toggleLogin: () => void;
};

type Props = ModalStoreSelectors & ModalStoreActions;

export const useModalStore = create<Props>()((set, get) => ({
  login: false,
  toggleLogin: () => set({ login: !get().login }),
}));
