const tableKeys = {
  customerName: "주문자 이름",
  productName: "상품 이름",
  quantity: "주문량",
  price: "가격",
  orderDate: "주문 날짜",
  status: "주문 상태",
};

interface IProps {
  customerOrderList: ICustomerOrder[];
}

export default function CustomerOrderListTable({ customerOrderList }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {Object.keys(tableKeys).map((tableKey) => (
          <div key={tableKey}>
            <span>{tableKeys[tableKey as keyof typeof tableKeys]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {customerOrderList.map((order) => {
          return (
            <div key={order.orderId}>
              {Object.keys(tableKeys).map((tableKey) => (
                <div key={tableKey}>
                  <span>{order[tableKey as keyof typeof tableKeys]}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
