import React, { useCallback, useEffect, useState } from "react";
import { GiAsteroid } from "react-icons/gi";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { averageDiameter } from "../../helpers/helpers";
import Chart from "../chart/Chart";
import { ApproachData } from "../../../interface/asteroid";

interface ItemsProps {
  id: string;
  name: string;
  magnitude: number;
  limited_name?: string;
  minDiameter: number;
  maxDiameter: number;
  distance: ApproachData[];
}

export default function Item({ name, minDiameter, maxDiameter, distance, id, magnitude }: ItemsProps) {
  // I created an itemId state to manage the focus management in the app for accessibility purposes. The functionality is when the modal is open the focus it is placed
  // in the first interactive element inside the modal and when the modal it is closed the focus it is placed where the button that first fired the action
  const [itemId, setItemId] = useState<number | null>(null);
  const [openModal, setModal] = useState<boolean>(false);

  const handleClick = useCallback((idValue: number) => {
    setItemId(Number(idValue));
    setModal(true);
  }, [])

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (!openModal) {
      const buttonToFocus = document.querySelector(
        `button[data-item-id="${itemId}"]`
      );

      if (buttonToFocus instanceof HTMLElement) {
        buttonToFocus.focus();
      }
    }
  }, [openModal, itemId]);


  return (
    <section className="p-4 w-4/6 align-middle rounded-md shadow-md shadow-slate-400">
      <div className="flex flex-row items-center text-neutral-950 dark:text-neutral-300">
        <h3 className="my-2 text-xl">{name}</h3>
        <GiAsteroid />
      </div>
      <p className="text-neutral-950 dark:text-neutral-300 my-2"><strong>Diameter:</strong> {averageDiameter(minDiameter, maxDiameter).toFixed(3)} meters</p>
      <p className="text-neutral-950 dark:text-neutral-300 my-2"><strong>Magnitude:</strong> {magnitude}</p>
      <Button
        aria-label={`See more information about ${name}`}
        onClick={() => handleClick(Number(id))}
        variant="secondary"
        data-item-id={id}
      >
        More info
      </Button>
      {openModal && <Modal title={name} isOpen={openModal} onClose={closeModal}>
        <Chart distance={distance} />
      </Modal>}
    </section>
  )
}