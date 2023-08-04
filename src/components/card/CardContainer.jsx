import React from 'react';

const CardContainer = ({ children }) => {
    return (
        <section className='section'>
            <div className='container'>
                <div className='is-flex is-flex-direction-column is-align-items-center'>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default CardContainer;