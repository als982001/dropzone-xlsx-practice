import { useState } from "react";
import { cloneDeep } from "lodash";

import ProductList from "./dummyData/ProductList";
import GameCharacters from "./dummyData/GameCharacter";
import CustomerOrders from "./dummyData/CustomerOrderList";
import ProductListTable from "./Components/ProductListTable";
import GameCharactersTable from "./Components/GameCharactersTable";
import CustomerOrderListTable from "./Components/CustomerOrderListTable";
import DataTable from "./Components/DataTable";

const selectableKeys: Record<TKey, string> = {
  productList: "상품 목록",
  gamecharacters: "게임 캐릭터들",
  customerOrderList: "주문 목록",
};

const dataFieldLabels: Record<TKey, Record<string, string>> = {
  productList: {
    productName: "상품 이름",
    category: "카테고리",
    price: "가격",
    stock: "남은 개수",
    registeredDate: "등록 날짜",
  },
  gamecharacters: {
    name: "이름",
    class: "직업",
    level: "레벨",
    health: "체력",
    mana: "마나",
    attackPower: "공격력",
    defense: "방어력",
    creationDate: "생성날짜",
  },
  customerOrderList: {
    customerName: "주문자 이름",
    productName: "상품 이름",
    quantity: "주문량",
    price: "가격",
    orderDate: "주문 날짜",
    status: "주문 상태",
  },
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

    const selectedData = data[selectedKey];

    const rows = selectedData.reduce((acc: string[][], datum) => {
      const row = Object.values(datum);
      acc.push(row);

      return acc;
    }, []);

    const columnHeader = setIsLoading(false);
  };

  return (
    <div>
      <div>
        <div>
          {Object.keys(selectableKeys).map((selectableKey) => (
            <div key={selectableKey}>
              <button
                disabled={isLoading}
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
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            makeExcelFile();
          }}
        >
          엑셀 다운로드
        </button>
      </div>
      <div>
        <DataTable
          selectedFieldLabels={dataFieldLabels[selectedKey]}
          selectedData={data[selectedKey]}
        />
      </div>
    </div>
  );
}

export default App;
