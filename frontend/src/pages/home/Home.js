import React from 'react';
import Hero from '../../components/hero/Hero';
import Features from '../../components/features/Features';
import './Home.css'; 

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default Home;
