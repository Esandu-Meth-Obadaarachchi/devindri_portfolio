import { createContext, useContext } from "react";

/** Lets any phone on the page open the full screen reel viewer. */
export const ReelViewerContext = createContext({ open: () => {} });

export function useReelViewer() {
  return useContext(ReelViewerContext);
}
