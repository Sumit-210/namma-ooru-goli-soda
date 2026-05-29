import { useEffect, useState } from "react"
import { Upload, Trash2, PackagePlus } from "lucide-react"

import api from "../services/api"

function AdminProducts() {

    const [products, setProducts] = useState([])

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        flavor: "",
        price: "",
        imageUrl: ""
    })

    const [preview, setPreview] = useState("")

    // BACKEND URL
    const BASE_URL =
        "https://demotion-hastily-unable.ngrok-free.dev"

    useEffect(() => {

        fetchProducts()

    }, [])

    const fetchProducts = async () => {

        try {

            const response =
                await api.get("/products")

            setProducts(response.data)

        } catch (error) {

            console.error(error)

        }
    }

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // IMAGE UPLOAD
    const handleImageUpload = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        // LOCAL PREVIEW
        const localPreview =
            URL.createObjectURL(file)

        setPreview(localPreview)

        const imageData = new FormData()

        imageData.append("file", file)

        try {

            const response = await api.post(
                "/upload",
                imageData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            )

            const uploadedImagePath =
                response.data

            setFormData(prev => ({
                ...prev,
                imageUrl: uploadedImagePath
            }))

        } catch (error) {

            console.error(error)

            alert("Image upload failed")
        }
    }

    // ADD PRODUCT
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

            setPreview("")

        } catch (error) {

            console.error(error)
        }
    }

    // DELETE PRODUCT
    const deleteProduct = async (id) => {

        try {

            await api.delete(`/products/${id}`)

            fetchProducts()

        } catch (error) {

            console.error(error)
        }
    }

    return (

        <div className="min-h-screen bg-gray-100 p-4 md:p-10">

            {/* TITLE */}
            <div className="mb-10">

                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">

                    Product Management

                </h1>

                <p className="text-gray-500 mt-2">

                    Add and manage your goli soda products

                </p>

            </div>

            {/* FORM */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl mb-12 max-w-2xl">

                <div className="grid gap-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="text"
                        name="flavor"
                        placeholder="Flavor"
                        value={formData.flavor}
                        onChange={handleChange}
                        className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* IMAGE UPLOAD */}
                    <label className="border-2 border-dashed border-green-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition">

                        <Upload
                            size={40}
                            className="text-green-600 mb-3"
                        />

                        <p className="font-semibold text-gray-700">

                            Choose Product Image

                        </p>

                        <span className="text-sm text-gray-500 mt-1">

                            JPG, PNG, WEBP

                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                    </label>

                    {/* PREVIEW */}
                    {
                        preview && (

                            <div className="mt-2">

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-2xl shadow-md"
                                />

                            </div>
                        )
                    }

                    {/* BUTTON */}
                    <button
                        onClick={addProduct}
                        className="bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg shadow-lg"
                    >

                        <PackagePlus size={22} />

                        Add Product

                    </button>

                </div>

            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    products.map(product => (

                        <div
                            key={product.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition"
                        >

                            <img
                                src={
                                    product.imageUrl
                                        ? `${BASE_URL}${product.imageUrl}`
                                        : "https://placehold.co/600x400?text=No+Image"
                                }
                                alt={product.name}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    e.target.src =
                                        "https://placehold.co/600x400?text=Image+Error"
                                }}
                            />

                            <div className="p-6">

                                <h2 className="text-2xl font-bold text-gray-800">

                                    {product.name}

                                </h2>

                                <p className="text-sm text-green-600 font-medium mt-1">

                                    {product.flavor}

                                </p>

                                <p className="mt-3 text-gray-600">

                                    {product.description}

                                </p>

                                <p className="mt-4 text-2xl font-bold text-green-600">

                                    ₹ {product.price}

                                </p>

                                <button
                                    onClick={() =>
                                        deleteProduct(product.id)
                                    }
                                    className="mt-5 bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
                                >

                                    <Trash2 size={18} />

                                    Delete

                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default AdminProducts