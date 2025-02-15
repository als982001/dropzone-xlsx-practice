interface IProps {
  productList: IProduct[];
}

export default function ProductListTable({ productList }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <span>이름</span>
        </div>
        <div>
          <span>카테고리</span>
        </div>
        <div>
          <span>가격</span>
        </div>
        <div>
          <span>남은 개수</span>
        </div>
        <div>
          <span>등록 날짜</span>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {productList.map((product) => {
          return (
            <div key={product.productId}>
              <div>
                <span>{product.productName}</span>
              </div>
              <div>
                <span>{product.category}</span>
              </div>
              <div>
                <span>{product.price}</span>
              </div>
              <div>
                <span>{product.stock}</span>
              </div>
              <div>
                <span>{product.registeredDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
