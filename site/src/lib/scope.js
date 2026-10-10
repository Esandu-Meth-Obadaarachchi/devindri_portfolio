import { createContext, useCallback, useContext, useMemo, useState } from "react";

/** The services section is a picker, not a list. What gets ticked there ends up in
 *  the contact form, so a visitor can send the brief instead of writing one. */
export const ScopeContext = createContext({
  selected: [],
  toggle: () => {},
  clear: () => {},
  draft: "",
  send: () => {},
});

export function useScope() {
  return useContext(ScopeContext);
}

export function useScopeState() {
  const [selected, setSelected] = useState([]);
  const [draft, setDraft] = useState("");

  const toggle = useCallback((id) => {
    setSelected((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const send = useCallback((titles) => {
    const lines = titles.map((title) => `- ${title}`).join("\n");
    setDraft(`Hi Devindri, I am looking for help with:\n\n${lines}\n\nHere is what we are working on: `);
  }, []);

  return useMemo(() => ({ selected, toggle, clear, draft, send }), [selected, toggle, clear, draft, send]);
}
