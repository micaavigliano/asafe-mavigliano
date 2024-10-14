import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }

    if (event.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

      const elements = Array.from(focusableElements || []).filter(
        (el) => !el.hasAttribute("disabled")
      );

      if (elements.length === 0) return;

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements?.length) {
        requestAnimationFrame(() => {
          focusableElements[0].focus();
        });
      }

      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      aria-labelledby="modal-id"
      aria-modal="true"
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="text-center w-10/12 h-5/6 max-[430px]:w-10/12 bg-white dark:bg-slate-800 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex flex-row justify-between items-center p-2 dark:bg-slate-950 bg-slate-500">
          <h2 id="modal-id" className="text-neutral-950 dark:text-neutral-300">
            {title}
          </h2>
          <Button
            onClick={onClose}
            variant="link"
            aria-label="close modal"
            className="text-neutral-950 dark:text-neutral-300"
          >
            <MdClose />
          </Button>
        </div>
        <div className="overflow-auto text-left p-4">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
