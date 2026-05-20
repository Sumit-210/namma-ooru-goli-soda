import { useEffect, useState, useContext } from "react"

import api from "../services/api"

import {
    CartContext
} from "../context/CartContext"

function Products() {

    const [products, setProducts] =
        useState([])

    const { addToCart } =
        useContext(CartContext)

    useEffect(() => {

        fetchProducts()

    }, [])

    const fetchProducts = async () => {

        try {

            const response =
                await api.get("/products")

            setProducts(response.data)

        } catch (error) {

            console.log(error)

        }
    }

    return (

        <section
            id="products"
            className="
                py-20
                px-4
                md:px-10
                bg-gradient-to-b
                from-lime-50
                to-white
            "
        >

            {/* Header */}
            <div className="text-center mb-12">

                <p className="
                    uppercase
                    tracking-[4px]
                    text-green-600
                    font-semibold
                    text-sm
                    mb-3
                ">

                    Refreshing Collection

                </p>

                <h2 className="
                    text-3xl
                    md:text-5xl
                    font-extrabold
                    text-gray-800
                ">

                    Our Products

                </h2>

                <p className="
                    mt-4
                    text-gray-600
                    max-w-2xl
                    mx-auto
                    text-sm
                    md:text-lg
                ">

                    Explore authentic Goli Soda flavors
                    crafted for refreshment and tradition.

                </p>

            </div>

            {/* Products Grid */}
            <div
                className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-4
                    md:gap-8
                    max-w-7xl
                    mx-auto
                "
            >

                {
                    products.map(product => (

                        <div
                            key={product.id}
                            className="
                                bg-white
                                rounded-2xl
                                overflow-hidden
                                shadow-md
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                                border
                                border-gray-100
                            "
                        >

                            {/* Product Image */}
                            <div className="relative overflow-hidden">

                                <img
                                    src={`http://localhost:8080${product.imageUrl}`}
                                    alt={product.name}
                                    className="
                                        w-full
                                        h-40
                                        md:h-64
                                        object-cover
                                        hover:scale-105
                                        transition
                                        duration-500
                                    "
                                />

                                {/* Flavor Badge */}
                                <div className="
                                    absolute
                                    top-2
                                    left-2
                                    bg-green-500
                                    text-white
                                    text-[10px]
                                    md:text-xs
                                    px-3
                                    py-1
                                    rounded-full
                                    font-bold
                                    shadow
                                ">

                                    {product.flavor}

                                </div>

                            </div>

                            {/* Product Content */}
                            <div className="p-3 md:p-5">

                                <h3 className="
                                    text-sm
                                    md:text-xl
                                    font-bold
                                    text-gray-800
                                    line-clamp-1
                                ">

                                    {product.name}

                                </h3>

                                <p className="
                                    text-gray-500
                                    text-xs
                                    md:text-sm
                                    mt-2
                                    line-clamp-2
                                    min-h-[32px]
                                    md:min-h-[45px]
                                ">

                                    {product.description}

                                </p>

                                {/* Price */}
                                <div className="mt-3">

                                    <p className="
                                        text-green-600
                                        font-extrabold
                                        text-lg
                                        md:text-2xl
                                    ">

                                        ₹ {product.price}

                                    </p>

                                </div>

                                {/* Button */}
                                <button
                                    onClick={() =>
                                        addToCart(product)
                                    }
                                    className="
                                        mt-3
                                        w-full
                                        bg-gradient-to-r
                                        from-green-500
                                        to-lime-500
                                        hover:from-green-600
                                        hover:to-lime-600
                                        text-white
                                        py-2
                                        md:py-3
                                        rounded-xl
                                        text-sm
                                        md:text-base
                                        font-bold
                                        transition
                                        duration-300
                                    "
                                >

                                    Add To Cart

                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </section>
    )
}

export default Products