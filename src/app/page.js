"use client";
import { useState } from "react";
import menuItems from "./data";

export default function Home() {
  const [order, setOrder] = useState([]);

  const addItem = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((i) => i.id === item.id);
      if (existingItem) {
        return prevOrder.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((i) => i.id === item.id);
      if (existingItem.quantity === 1) {
        return prevOrder.filter((i) => i.id !== item.id);
      }
      return prevOrder.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const createWhatsAppMessage = () => {
    const message = order
      .map(
        (item) =>
          `${item.name} x${item.quantity} (R$${(
            item.price * item.quantity
          ).toFixed(2)})`
      )
      .join("\n");

    const encodedMessage = encodeURIComponent(
      "Olá, gostaria de fazer um pedido com os seguintes produtos:\n" + message
    );

    return `https://wa.me/5516996274900?text=${encodedMessage}`;
  };

  const getTotalPrice = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-200 to-pink-100">
      <header className="text-center p-4 bg-pink-300 shadow-md">
        <h1 className="text-3xl font-bold text-pink-800">Delícias da Cris</h1>
      </header>

      <main className="flex-1 p-4 overflow-auto">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-md"
            >
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-800">
                  {item.name}
                </div>
                <div className="text-md text-gray-600">R${item.price}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-pink-600 text-white px-3 py-1 rounded-lg hover:bg-pink-700 transition-colors duration-300"
                  onClick={() => addItem(item)}
                >
                  Adicionar
                </button>
                <button
                  className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition-colors duration-300"
                  onClick={() => removeItem(item)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-pink-300 p-4 shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-pink-800 mb-2">Meu Pedido</h2>
          {order.length > 0 ? (
            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md">
              <ul className="list-disc pl-5 text-gray-700">
                {order.map((item) => (
                  <li key={item.id} className="text-md mb-1">
                    {item.name} x{item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum item no pedido.</p>
          )}
        </div>
        {order.length > 0 && (
          <>
            <div className="font-bold mt-4">
              Total: R${getTotalPrice().toFixed(2)}
            </div>
            <a
              href={createWhatsAppMessage()}
              target="_blank"
              className="bg-pink-600 text-white text-center px-4 py-2 rounded-lg w-full block hover:bg-pink-700 transition-colors duration-300"
            >
              Finalizar Pedido
            </a>
          </>
        )}
      </footer>
    </div>
  );
}
