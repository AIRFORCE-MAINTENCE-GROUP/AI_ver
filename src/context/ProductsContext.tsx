import React, { createContext, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  title: string;
  location: string;
  time: string;
  price: number;
  image?: ImageSourcePropType;
  category?: string;
  description?: string;
};

const INITIAL: Product[] = [
  { id: '1', title: '아이폰 14 프로 256GB', location: '서교동', time: '방금 전', price: 850000, image: require('../../assets/images/p1.png') },
  { id: '2', title: '나이키 에어맥스 270', location: '망원동', time: '방금 전', price: 65000, image: require('../../assets/images/p2.png') },
  { id: '3', title: '삼성 갤럭시 버즈2', location: '합정동', time: '방금 전', price: 50000, image: require('../../assets/images/p3.png') },
  { id: '4', title: '닌텐도 스위치 OLED', location: '연남동', time: '방금 전', price: 280000, image: require('../../assets/images/p4.png') },
  { id: '5', title: '다이슨 에어랩 멀티 스타일러', location: '상수동', time: '방금 전', price: 390000, image: require('../../assets/images/p5.png') },
  { id: '6', title: '맥북 프로 14인치', location: '서교동', time: '방금 전', price: 1650000 },
];

type Ctx = {
  products: Product[];
  addProduct: (p: Omit<Product, 'id' | 'time' | 'location'>) => void;
};

const ProductsContext = createContext<Ctx | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL);

  const addProduct: Ctx['addProduct'] = (p) =>
    setProducts((prev) => [
      { ...p, id: String(Date.now()), location: '서교동', time: '방금 전' },
      ...prev,
    ]);

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used inside ProductsProvider');
  return ctx;
}

export const formatPrice = (n: number) =>
  n <= 0 ? '가격 협의' : `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
