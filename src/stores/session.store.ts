import { create } from "zustand";
import type { SessionType } from "../types";

type SessionStoreType = {
  session: SessionType | null;
  loading: boolean;
  setSession: (payload: SessionType | null) => void;
  setLoading: (payload: boolean) => void;
};

export const useSession = create<SessionStoreType>((set) => ({
  session: null,
  loading: true,
  setSession: (payload) => set({ session: payload }),
  setLoading: (payload) => set({ loading: payload }),
}));
