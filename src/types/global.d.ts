declare global {
  interface IGameCharacter {
    id: string;
    name: string;
    class: string;
    level: number;
    health: number;
    mana: number;
    attackPower: number;
    defense: number;
    creationDate: string;
  }
  interface IProduct {
    id: string;
    productName: string;
    category: string;
    price: number;
    stock: number;
    registeredDate: string;
  }
  interface ICustomerOrder {
    id: string;
    customerName: string;
    productName: string;
    quantity: number;
    price: number;
    orderDate: string;
    status: "주문 완료" | "배송 중" | "배송 완료" | "취소됨" | string;
  }
  type TKey = "productList" | "gamecharacters" | "customerOrderList";
}

export {};
