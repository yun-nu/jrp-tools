import { createContext, PropsWithChildren, useContext } from "react";
import type { ExistingCharacter } from "../_schemas/Character";

interface CharacterContextProps {
  character: ExistingCharacter;
  isPublicPage?: boolean;
  showTableActions?: boolean;
}

const CharacterContext = createContext<
  | (ExistingCharacter & { isPublicPage?: boolean; showTableActions?: boolean })
  | undefined
>(undefined);

export const CharacterProvider = ({
  character,
  isPublicPage,
  showTableActions,
  children,
}: PropsWithChildren<CharacterContextProps>) => (
  <CharacterContext.Provider
    value={{ ...character, isPublicPage, showTableActions }}
  >
    {children}
  </CharacterContext.Provider>
);

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacter must be used within a CharacterProvider");
  return context;
}
