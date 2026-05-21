type Props = {
  orderId: number;
};

export const OrderStatusActions = ({
  orderId,
}: Props) => {
  const changeStatus = (
    status: string
  ) => {
    console.log(
      "Pedido",
      orderId,
      "→",
      status
    );
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() =>
          changeStatus("aprobado")
        }
      >
        Aprobado
      </button>

      <button
        onClick={() =>
          changeStatus("en_proceso")
        }
      >
        En proceso
      </button>

      <button
        onClick={() =>
          changeStatus("listo")
        }
      >
        Listo
      </button>

      <button
        onClick={() =>
          changeStatus("entregado")
        }
      >
        Entregado
      </button>
    </div>
  );
};