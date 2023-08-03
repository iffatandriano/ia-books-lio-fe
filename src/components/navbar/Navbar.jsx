/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

const Navbar = () => {
    const [isNavMobile, setIsNavMobile] = useState(false);

    return (
        <nav className="container navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <span className='title'>E-Library Book</span>
                </a>

                <a 
                    role="button" 
                    className="navbar-burger"
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarLibraryBooks"
                    onClick={() => setIsNavMobile(!isNavMobile)}
                >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarLibraryBooks" className={`navbar-menu ${isNavMobile ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <a href="/" className="navbar-item">
                        Home
                    </a>
                    <div className='buttons'>
                        <a href="/wishlist" className="navbar-item button is-primary">
                            Wishlist
                        </a>
                    </div>

                </div>

                {/* <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                    <a href="/" className="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a href="/" className="button is-light">
                        Log in
                    </a>
                    </div>
                </div>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;