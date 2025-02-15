import { useState } from "react";
import { cloneDeep } from "lodash";

import ProductList from "./dummyData/ProductList";
import GameCharacters from "./dummyData/GameCharacter";
import CustomerOrders from "./dummyData/CustomerOrderList";
import ProductListTable from "./Components/ProductListTable";
import GameCharactersTable from "./Components/GameCharactersTable";
import CustomerOrderListTable from "./Components/CustomerOrderListTable";

const selectableKeys: Record<TKey, string> = {
  productList: "상품 목록",
  gamecharacters: "게임 캐릭터들",
  customerOrderList: "주문 목록",
};

interface IData {
  productList: IProduct[];
  gamecharacters: IGameCharacter[];
  customerOrderList: ICustomerOrder[];
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<TKey>("productList");
  const [data, setData] = useState<IData>({
    productList: cloneDeep(ProductList),
    gamecharacters: cloneDeep(GameCharacters),
    customerOrderList: cloneDeep(CustomerOrders),
  });

  const handleChangeSelectedKey = (clickedKey: TKey) => {
    setSelectedKey(clickedKey);
  };

  const makeExcelFile = () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <div>
          {Object.keys(selectableKeys).map((selectableKey) => (
            <div key={selectableKey}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleChangeSelectedKey(selectableKey as TKey);
                }}
              >
                {selectableKeys[selectableKey as keyof typeof selectableKeys]}
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            makeExcelFile();
          }}
        >
          엑셀 다운로드
        </button>
      </div>
      <div>
        {selectedKey === "productList" && (
          <ProductListTable productList={data.productList} />
        )}
        {selectedKey === "gamecharacters" && (
          <GameCharactersTable gamecharacters={data.gamecharacters} />
        )}
        {selectedKey === "customerOrderList" && (
          <CustomerOrderListTable customerOrderList={data.customerOrderList} />
        )}
      </div>
    </div>
  );
}

export default App;
