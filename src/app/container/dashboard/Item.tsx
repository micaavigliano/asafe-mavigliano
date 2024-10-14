import { useEffect, useState } from "react";
import { GiAsteroid } from "react-icons/gi";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { averageDiameter } from "@/app/helpers/helpers";
import Chart from "../chart/Chart";
import { ApproachData } from "@/interface/asteroid";

interface ItemsProps {
  id: string;
  name: string;
  limited_name?: string;
  minDiameter: number;
  maxDiameter: number;
  distance: ApproachData[];
}

export default function Item({ name, minDiameter, maxDiameter, distance, id }: ItemsProps) {
  const [itemId, setItemId] = useState<number | null>(null);
  const [openModal, setModal] = useState<boolean>(false);

  const handleClick = (idValue: number) => {
    setItemId(Number(idValue));
    setModal(true);
  };

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
        <h3 className="mr-4 text-xl">{name}</h3>
        <GiAsteroid />
      </div>
      <p className="text-neutral-950 dark:text-neutral-300"><strong>Diameter:</strong> {averageDiameter(minDiameter, maxDiameter).toFixed(3)} meters</p>
      <Button
        aria-label={`See more information about ${name}`}
        onClick={() => handleClick(Number(id))}
        variant="secondary"
        data-item-id={id}
        className="text-neutral-950 dark:text-neutral-300"
      >
        More info
      </Button>
      {openModal && <Modal title={name} isOpen={openModal} onClose={closeModal}>
        <Chart distance={distance} />
      </Modal>}
    </section>
  )
}