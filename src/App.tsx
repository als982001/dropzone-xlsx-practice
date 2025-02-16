import { useState } from "react";
import { cloneDeep } from "lodash";
import * as XLSX from "xlsx";

import ProductList from "./dummyData/ProductList";
import GameCharacters from "./dummyData/GameCharacter";
import CustomerOrders from "./dummyData/CustomerOrderList";
import DataTable from "./Components/DataTable";
import { excelDownload } from "./utils/excelDownload";
import ExcelUploadModal from "./Components/ExcelUploadModal";

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

export interface IData {
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
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChangeSelectedKey = (clickedKey: TKey) => {
    setSelectedKey(clickedKey);
  };

  const handleUpdateData = ({
    dataKey,
    updatedData,
  }: {
    dataKey: TKey;
    updatedData: any[];
  }) => {
    setData((prev) => ({
      ...prev,
      [dataKey]: [...updatedData],
    }));
  };

  const downloadExcelFile = () => {
    // 1. 로딩 상태 활성화
    setIsLoading(true);

    // 2. 현재 선택된 데이터의 필드 라벨 가져오기
    const selectedLabels = dataFieldLabels[selectedKey];

    // 3. 현재 선택된 데이터 가져오기
    const selectedData = data[selectedKey];

    /* electedData 값 예시: [
      {
        id: "P1001",
        productName: "무선 블루투스 이어폰",
        category: "전자기기",
        price: 129000,
        stock: 50,
        registeredDate: "2024-02-20",
      }
      ...
    ]
    */

    // 4. 데이터 가공 (각 행 데이터를 배열로 변환)
    const rows: string[][] = selectedData.map((datum) =>
      Object.values(datum).slice(1)
    );

    // 5. 컬럼 헤더 가져오기
    const columnHeaders = Object.values(selectedLabels);

    // 6. 엑셀 파일 생성
    const book = XLSX.utils.book_new(); // 새 엑셀 문서 생성
    const column = XLSX.utils.aoa_to_sheet([[...columnHeaders], ...rows]); // 데이터 시트 생성
    XLSX.utils.book_append_sheet(book, column); // 문서에 시트 추가

    // 7. 파일명 설정
    const fileName = `엑셀_다운로드_${new Date().toISOString().slice(0, 10)}`;

    // 8. 파일 다운로드 실행
    excelDownload({ excelTemplate: book, fileName });

    // 9. 로딩 상태 비활성화
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              엑셀 업로드
            </button>
            <button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                downloadExcelFile();
              }}
            >
              엑셀 다운로드
            </button>
          </div>
        </div>
        <div>
          <DataTable
            selectedFieldLabels={dataFieldLabels[selectedKey]}
            selectedData={data[selectedKey]}
          />
        </div>
      </div>
      {showModal && (
        <ExcelUploadModal
          selectedKey={selectedKey}
          selectedFieldLabels={dataFieldLabels[selectedKey]}
          setShowModal={setShowModal}
          setIsLoading={setIsLoading}
          handleUpdateData={handleUpdateData}
        />
      )}
    </>
  );
}

export default App;
