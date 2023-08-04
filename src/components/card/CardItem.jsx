import React from 'react';
import StarRatings from 'react-star-ratings';
import _ from 'lodash';

// icons
import { BsFillBookmarkFill } from 'react-icons/bs';

const CardItem = ({
    books,
    id,
    title,
    description,
    wishlists,
    authors,
    rating,
    thumbnail,
    onClick,
}) => {
    return (
        <div className={`column ${books.length > 3 ? 'is-3' : null}`}>
            <div className="card" style={{ height: '100%' }}>
                <div className="card-image is-relative">
                    <figure className="image is-4by3">
                        <img 
                            src={!_.isEmpty(thumbnail) ? thumbnail : "https://bulma.io/images/placeholders/1280x960.png"} 
                            alt="img_picture" 
                        />
                    </figure>
                    <div 
                        className='is-absolute is-pulled-right is-clickable' 
                        style={{position: 'absolute', top: 10, right: 10 }}
                        onClick={onClick}
                    >
                        <BsFillBookmarkFill size={32} color={_.some(wishlists, (wishlist) => wishlist.id === id) ? 'red' : '#e3e3e3'} />
                    </div>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{title || '-'}</p>
                            <p className="subtitle is-6" style={{marginBottom: 0}}>{authors || '-'}</p>
                            <StarRatings
                                rating={rating}
                                starRatedColor='red'
                                numberOfStars={5}
                                name="rating_book"
                                starDimension='15px'
                                starSpacing='1px'
                            />
                        </div>
                    </div>

                    <div className="content">
                        {description.slice(0, 250)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;