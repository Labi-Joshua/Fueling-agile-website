"use client";

// Site-wide "Request fuel cards" modal. Every "Request fuel cards" CTA button
// (Hero, HowItWorks, WhyUs, StatsSection) opens the same modal instance via
// useRequestFuelCardModal() rather than each owning its own — this is the one
// place its open/closed state lives.
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import RequestFuelCardModal from "@/components/ui/RequestFuelCardModal";
import { requestFuelCardModalContent } from "@/data/mockContent";

interface RequestFuelCardModalContextValue {
  open: () => void;
}

const RequestFuelCardModalContext = createContext<RequestFuelCardModalContextValue | null>(null);

export function useRequestFuelCardModal() {
  const context = useContext(RequestFuelCardModalContext);
  if (!context) {
    throw new Error("useRequestFuelCardModal must be used within a RequestFuelCardModalProvider");
  }
  return context;
}

export default function RequestFuelCardModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <RequestFuelCardModalContext.Provider value={value}>
      {children}
      <RequestFuelCardModal isOpen={isOpen} onClose={close} content={requestFuelCardModalContent} />
    </RequestFuelCardModalContext.Provider>
  );
}
