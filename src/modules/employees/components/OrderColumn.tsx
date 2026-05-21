import { OrderCard } from "./OrderCard";

type Props = {
  title: string;
  orders: any[];
};

export const OrderColumn = ({
  title,
  orders,
}: Props) => {
  return (
    <div className="rounded-xl bg-gray-100 p-3 min-h-[500px]">
  <h2 className="mb-4 text-lg font-bold capitalize">
    {title}
  </h2>

  <div className="space-y-3">
    {orders.map((order) => (
      <OrderCard
        key={order.id}
        order={order}
      />
    ))}
  </div>
</div>
  );
};