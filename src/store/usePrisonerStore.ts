import { create } from "zustand";
import { prisoners as mockPrisoners } from "@/data/mockPrisoners";

export const usePrisonerStore = create((set, get) => ({
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
