import Item from "./Item"

interface Container {
  items: any
}

export default function ItemsContainer({ items }: Container) {
  return (
    <section className="grid grid-cols-2 gap-7">
      {items?.map((asteroid: any) => (
        <Item name={asteroid.name} limited_name={asteroid.name_limited} key={asteroid.id} />
      ))}
    </section>
  )
}