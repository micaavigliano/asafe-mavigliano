import { useState } from "react";
import { GiAsteroid } from "react-icons/gi";
import Button from "../reusableComponents/Button";
import Modal from "../reusableComponents/Modal";

interface ItemsProps {
  name: string;
  limited_name: string;
}

export default function Item({ name, limited_name }: ItemsProps) {
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
        <h3 className="mr-4">{limited_name}</h3>
        <GiAsteroid />
      </div>
      <p className="text-neutral-950 dark:text-neutral-300"><strong>Completed name:</strong> {name}</p>
      <Button
        aria-label={`See more information about ${limited_name}`}
        onClick={handleModal}
        variant="link"
      >
        More info
      </Button>
      {openModal && <Modal title={limited_name} isOpen={openModal} onClose={closeModal}>hola</Modal>}
    </section>
  )
}