import { useEffect, useState }
from "react"

import api from "../services/api"

function AdminProducts() {

    const [products, setProducts] =
        useState([])

   const [formData, setFormData] =
    useState({

        name: "",
        description: "",
        flavor: "",
        price: "",
        imageUrl: ""
    })

    useEffect(() => {

        fetchProducts()

    }, [])

    const fetchProducts = async () => {

        try {

            const response =
                await api.get("/products")

            setProducts(response.data)

        } catch(error) {

            console.error(error)
        }
    }

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value
        })
    }

    const addProduct = async () => {

        try {

            await api.post(
                "/products",
                formData
            )

            fetchProducts()

            setFormData({

    name: "",
    description: "",
    flavor: "",
    price: "",
    imageUrl: ""
})

        } catch(error) {

            console.error(error)
        }
    }

    const deleteProduct =
        async (id) => {

        try {

            await api.delete(
                `/products/${id}`
            )

            fetchProducts()

        } catch(error) {

            console.error(error)
        }
    }

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">

                Product Management

            </h1>

            <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 grid gap-5 max-w-xl">

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-4 border rounded-xl"
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-4 border rounded-xl"
                />
                <input
    type="text"
    name="flavor"
    placeholder="Flavor"
    value={formData.flavor}
    onChange={handleChange}
    className="p-4 border rounded-xl"
/>

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="p-4 border rounded-xl"
                />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="p-4 border rounded-xl"
                />

                <button
                    onClick={addProduct}
                    className="bg-green-600 text-white py-4 rounded-xl hover:bg-green-700">

                    Add Product

                </button>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

                {
                    products.map(product => (

                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-2xl shadow-xl">

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-56 object-cover rounded-xl mb-4"
                            />

                            <h2 className="text-2xl font-bold">

                                {product.name}

                            </h2>

                            <p className="mt-2">

                                {product.description}

                            </p>

                            <p className="mt-3 font-bold text-green-600">

                                ₹ {product.price}

                            </p>

                            <button
                                onClick={() =>
                                    deleteProduct(product.id)
                                }
                                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg">

                                Delete

                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default AdminProducts