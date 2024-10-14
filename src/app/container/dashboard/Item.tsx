import { useState } from "react";
import { GiAsteroid } from "react-icons/gi";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { averageDiameter } from "@/app/helpers/helpers";

interface ItemsProps {
  name: string;
  limited_name: string;
  minDiameter: number;
  maxDiameter: number;
}

export default function Item({ name, limited_name, minDiameter, maxDiameter }: ItemsProps) {
  const [openModal, setModal] = useState<boolean>(false);

  const handleModal = () => {
    setModal(true)
    console.log(openModal)
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <section className="p-4 w-4/6 align-middle rounded-md shadow-md shadow-slate-400">
      <div className="flex flex-row items-center text-neutral-950 dark:text-neutral-300">
        <h3 className="mr-4 text-xl">{name}</h3>
        <GiAsteroid />
      </div>
      <p className="text-neutral-950 dark:text-neutral-300"><strong>Diameter:</strong> {averageDiameter(minDiameter, maxDiameter).toFixed(3)} meters</p>
      <Button
        aria-label={`See more information about ${name}`}
        onClick={handleModal}
        variant="link"
      >
        More info
      </Button>
      {openModal && <Modal title={name} isOpen={openModal} onClose={closeModal}>
        hola
      </Modal>}
    </section>
  )
}