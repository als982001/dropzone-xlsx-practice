declare global {
  interface IGameCharacter {
    characterId: string;
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
    productId: string;
    productName: string;
    category: string;
    price: number;
    stock: number;
    registeredDate: string;
  }
  interface ICustomerOrder {
    orderId: string;
    customerName: string;
    productName: string;
    quantity: number;
    price: number;
    orderDate: string;
    status: "주문 완료" | "배송 중" | "배송 완료" | "취소됨";
  }
}

export {};
