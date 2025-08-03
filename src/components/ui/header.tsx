import React from 'react';

export function Header() {
  return (
    <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">Zappy</h1>
        <span className="text-green-200">&</span>
        <h1 className="text-xl font-bold">Kiwify</h1>
      </div>
    </div>
  );
}