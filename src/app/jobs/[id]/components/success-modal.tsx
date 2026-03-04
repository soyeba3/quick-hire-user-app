"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

export const SuccessModal = ({
  isOpen,
  onClose,
  message,
}: SuccessModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md bg-white shadow-2xl rounded-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50 animate-bounce">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
          </div>

          <h2 className="mb-3 text-3xl font-bold text-[#202430]">Success!</h2>
          <p className="mb-8 text-lg text-gray-500 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 text-base font-bold text-white transition-all bg-primary hover:bg-opacity-90 active:scale-95 shadow-lg shadow-primary/20"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
};
