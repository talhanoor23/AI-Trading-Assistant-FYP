import { create } from "zustand";

export const useTradingStore = create((set) => ({
  data: [],
  running: false,
  connected: false,

  addSignal: (msg) =>
    set((state) => ({
      data: [msg, ...state.data.slice(0, 50)],
    })),

  setRunning: (value) => set({ running: value }),
  setConnected: (value) => set({ connected: value }),
}));