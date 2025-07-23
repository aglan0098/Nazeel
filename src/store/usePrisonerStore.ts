import { create } from "zustand";
import { prisoners as mockPrisoners } from "@/data/mockPrisoners";
import type { Prisoner } from "@/types/Prisoner"; 

interface PrisonerStore {
  prisoners: Prisoner[];
  selectedPrisoner: Prisoner | null;
  notFound: boolean;
  setSelectedPrisoner: (prisoner: Prisoner) => void;
  selectPrisonerById: (idNumber: string) => void;
  resetNotFound: () => void;
}

export const usePrisonerStore = create<PrisonerStore>((set, get) => ({
  prisoners: mockPrisoners,
  selectedPrisoner: null,
  notFound: false,

  setSelectedPrisoner: (prisoner) => set({ selectedPrisoner: prisoner, notFound: false }),

  selectPrisonerById: (idNumber) => {
    const currentPrisoners = get().prisoners;
    const prisoner = currentPrisoners.find((p) => p.idNumber === idNumber);
    if (prisoner) {
      set({ selectedPrisoner: prisoner, notFound: false });
    } else {
      set({ selectedPrisoner: null, notFound: true });
    }
  },

  resetNotFound: () => set({ notFound: false }),
}));
