import { createContext, type Dispatch, type SetStateAction } from "react";

interface ISessionContext {
  isLoader: boolean;
  setIsLoader: Dispatch<SetStateAction<boolean>>;
}

export const SessionContext = createContext<ISessionContext>({
  isLoader: false,
  setIsLoader: () => undefined,
});
