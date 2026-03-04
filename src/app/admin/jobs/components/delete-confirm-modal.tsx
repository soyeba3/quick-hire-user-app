"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import { useEffect } from "react";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  jobTitle: string;
  isPending: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteConfirmModal({
  isOpen,
  jobTitle,
  isPending,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isPending) {
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
  }, [isOpen, isPending, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          if (!isPending) onClose();
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-4 bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start p-8 pb-0">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 border border-red-100">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <button
            onClick={onClose}
            disabled={isPending}
            className="p-2 rounded-xl text-text-light hover:text-text-dark hover:bg-bg-light transition-colors disabled:opacity-40"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 pt-6">
          <h2 className="text-2xl font-bold text-text-dark mb-2">
            Delete Job Posting
          </h2>
          <p className="text-text-gray text-lg leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-bold text-text-dark">
              &quot;{jobTitle}&quot;
            </span>
            ? This action cannot be undone and all associated applications will
            also be removed.
          </p>
        </div>

        <div className="flex gap-4 px-8 pb-8">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-6 py-4 font-bold text-text-dark border border-border-base hover:bg-bg-light transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
