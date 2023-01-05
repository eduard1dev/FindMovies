import { StateCreator } from "zustand";

export type UserProps = {
  displayName: string;
  photoURL: string;
};

export interface UserStateProps {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  resetUser: () => void;
}

export const createUserSlice: StateCreator<UserStateProps> = (set) => ({
  user: null,
  setUser: (user) =>
    set(() => ({
      user,
    })),
  resetUser: () => set(() => ({ user: null })),
});
