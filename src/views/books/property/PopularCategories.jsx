import React, { useCallback, useState } from 'react';
  
import { category } from '../../../utils/dummy/category';

import Button from '../../../components/Button';
import useBookStore from '../../../store/books';


const PopularCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState('Autobiography');
    const {setParams, params} = useBookStore()

    const onClick = useCallback((name) => {
        setSelectedCategory(name)
        setParams({
            ...params,
            search: name,
            page: 1,
        })
    }, [setSelectedCategory, setParams, params]);

    return (
        <section className='section'>
                <div className='container'>
                    <h1 className='title'>
                        <span className='has-text-centered is-block'>Discover Popular Categories</span>
                    </h1>
                    <div className='is-flex is-flex-direction-row is-justify-content-center is-align-items-center'>
                    <div className="buttons has-text-centered">
                        {category?.map((item, index) => (
                            <Button
                                key={index}
                                styles={item.name === selectedCategory ? 'is-primary' : ''}
                                label={item.name}
                                icon={() => (item.icon)}
                                onClick={() => onClick(item.name)}
                            />
                        ))}
                    </div>
                    </div>
                </div>
            </section>
    );
};

export default PopularCategories;