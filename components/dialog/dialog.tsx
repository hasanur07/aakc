// dialog.ts
import { ReactNode } from "react";

type DialogHandler = {
  push: (content: ReactNode) => void;
  pop: () => void;
  popAll: () => void;
} | null;

let handler: DialogHandler = null;

export const dialog = {
  show: (content: ReactNode) => {
    if (!handler) {
      console.warn("DialogProvider not mounted yet.");
      return;
    }
    handler.push(content);
  },
  hide: () => {
    if (!handler) return;
    handler.pop();
  },
  hideAll: () => {
    if (!handler) return;
    handler.popAll();
  },
  _register: (h: DialogHandler) => {
    handler = h;
  },
};
