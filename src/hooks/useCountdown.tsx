import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";

export function useCountdown() {
  const countdownContext = useContext(CountdownContext)

  return countdownContext
}
