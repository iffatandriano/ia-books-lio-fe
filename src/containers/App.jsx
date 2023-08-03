import React from 'react';
import Navbar from '../components/navbar/Navbar';
import RootLayout from './RootLayout';

const App = () => {
    return (
        <section className='section'>
            <Navbar />
            <RootLayout />
        </section>
    );
};

export default App;