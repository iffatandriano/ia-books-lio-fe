import React from "react"
import { createBrowserRouter } from "react-router-dom"

import { slug } from '../constants/slug';

import App from "../containers/App";

import BooksPage from "../views/books";
import WishlistPage from "../views/wishlist";

const router = createBrowserRouter(([
    {
        path: slug.books.to,
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <React.Suspense>
                        <BooksPage />
                    </React.Suspense>
                )
            },
            {
                path: slug.books.wishlist,
                element: (
                    <React.Suspense>
                        <WishlistPage />
                    </React.Suspense>
                )
            }
        ]
    }
]))

export default router;