import React from 'react';

export const HeroSection = () => {
  return (
    <section className="bg-cover bg-center h-60" style={{ backgroundImage: "url('../../src/assets/bg.jpg')" }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-4xl text-white font-bold">¡Recarga tu energía!</h1>
      </div>
    </section>
  );
};
