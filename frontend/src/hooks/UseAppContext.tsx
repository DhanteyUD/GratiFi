import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

function UseAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("UseAppContext must be used within an AppProvider");
  }

  return context;
}

export { UseAppContext };