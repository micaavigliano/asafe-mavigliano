import React, { ReactNode, useEffect, useRef, useState } from "react";
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }

    if (event.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      console.log(focusableElements);

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
  };

  useEffect(() => {
    console.log(isOpen, modalRef.current)
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      console.log(focusableElements);

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
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      aria-labelledby="modal-id"
      aria-modal="true"
      className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="text-center w-6/12 h-2/4 bg-white rounded-2xl flex flex-col overflow-hidden">
        <div className="flex flex-row justify-between items-center p-2 bg-slate-300">
          <h2 id="modal-id" className="text-neutral-950">
            {title}
          </h2>
          <Button
            onClick={onClose}
            variant="link"
            aria-label="close modal"
            className="text-neutral-950"
          >
            <MdClose />
          </Button>
        </div>
        <div className="h-4/6 overflow-auto text-left p-4">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
