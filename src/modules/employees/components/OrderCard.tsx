const statusFlow = [
  "aprobado",
  "en_proceso",
  "listo",
  "entregado",
];

type Props = {
  order: any;
};

export const OrderCard = ({
  order,
}: Props) => {
  const moveNext = () => {
    const currentIndex =
      statusFlow.indexOf(order.estado);

    const nextStatus =
      statusFlow[currentIndex + 1];

    if (!nextStatus) return;

    console.log(
      "Mover pedido",
      order.id,
      "a",
      nextStatus
    );

    // mutation acá
  };

  return (
    <article className="rounded-lg bg-white p-4 shadow">
      <h3 className="font-semibold">
        Pedido #{order.id}
      </h3>

      <p>{order.cliente}</p>

      <button
        onClick={moveNext}
        className="mt-3 rounded bg-blue-600 px-3 py-1 text-white"
      >
        Avanzar
      </button>
    </article>
  );
};