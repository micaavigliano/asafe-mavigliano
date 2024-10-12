import Item from "./Item"

interface Asteroid {
  id: string;
  name: string;
  name_limited: string;
}

interface Container {
  items: Asteroid[] | undefined;
}

export default function ItemsContainer({ items }: Container) {

  if (!items || items.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <section className="grid grid-cols-2 gap-7">
      {items?.map((asteroid: Asteroid) => (
        <Item name={asteroid.name} limited_name={asteroid.name_limited} key={asteroid.id} />
      ))}
    </section>
  )
}