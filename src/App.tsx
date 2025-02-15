import { useState } from "react";
import { cloneDeep } from "lodash";

import ProductList from "./dummyData/ProductList";
import GameCharacters from "./dummyData/GameCharacter";
import CustomerOrders from "./dummyData/CustomerOrderList";

type TKey = "product" | "gameCharacter" | "customerOrder";

interface IData {
  productList: IProduct[];
  gamecharacter: IGameCharacter[];
  customerOrderList: ICustomerOrder[];
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<TKey>("product");
  const [data, setData] = useState<IData>({
    productList: cloneDeep(ProductList),
    gamecharacter: cloneDeep(GameCharacters),
    customerOrder: cloneDeep(CustomerOrders),
  });

  const makeExcelFile = () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            makeExcelFile();
          }}
        >
          엑셀 다운로드
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default App;
