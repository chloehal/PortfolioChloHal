import { createContext, useContext } from "react";

interface SectorContextType {
  currentSector: string;
  onSectorChange: (sector: string) => void;
}

export const SectorContext = createContext<SectorContextType>({
  currentSector: "default",
  onSectorChange: () => {},
});

export const useSector = () => useContext(SectorContext);
