interface ItemsProps {
  name: string;
  limited_name: string;
}

export default function Item({ name, limited_name }: ItemsProps) {
  return (
    <div className="bg-orange-500 p-4">
      <h3 className="text-neutral-950 dark:text-neutral-300 text-center">{limited_name}</h3>
    </div>
  )
}