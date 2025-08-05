import { useMemo, useState } from "react";
import { SessionContext } from "./context";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isLoader,
      setIsLoader,
    }),
    [isLoader, setIsLoader]
  );
  return (
    <>
      <SessionContext.Provider value={value}>
        {children}
      </SessionContext.Provider>
    </>
  );
}
