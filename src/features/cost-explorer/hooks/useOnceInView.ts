import { useInView } from "framer-motion";
import { useRef, type RefObject } from "react";

/** Tracks the first time an element enters the viewport. */
export function useOnceInView<T extends HTMLElement>(): {
  ref: RefObject<T>;
  isInView: boolean;
} {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });
  return { ref, isInView };
}
