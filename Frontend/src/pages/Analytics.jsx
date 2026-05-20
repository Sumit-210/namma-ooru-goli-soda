import { useEffect, useState } from "react"
import api from "../services/api"

function Analytics() {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {

        fetchData()

    }, [])

    const fetchData = async () => {

        try {

            const ordersResponse =
                await api.get("/orders")

            const productsResponse =
                await api.get("/products")

            setOrders(ordersResponse.data)

            setProducts(productsResponse.data)

        } catch(error) {

            console.log(error)
        }
    }

    const totalOrders =
        orders.length

    const totalProducts =
        products.length

    const totalRevenue =
        orders.reduce(

            (total, order) =>

                total + order.price,

            0
        )

    const pendingOrders =
        orders.filter(

            order =>
                order.status === "PENDING"

        ).length

    return (

        <div className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-10">

                Analytics Dashboard

            </h1>

            <div className="grid md:grid-cols-4 gap-8">

                <div className="bg-white p-8 rounded-2xl shadow-xl">

                    <h2 className="text-2xl font-bold">

                        Total Orders

                    </h2>

                    <p className="text-4xl mt-4 text-green-600 font-bold">

                        {totalOrders}

                    </p>

                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl">

                    <h2 className="text-2xl font-bold">

                        Revenue

                    </h2>

                    <p className="text-4xl mt-4 text-green-600 font-bold">

                        ₹ {totalRevenue}

                    </p>

                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl">

                    <h2 className="text-2xl font-bold">

                        Products

                    </h2>

                    <p className="text-4xl mt-4 text-blue-600 font-bold">

                        {totalProducts}

                    </p>

                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl">

                    <h2 className="text-2xl font-bold">

                        Pending Orders

                    </h2>

                    <p className="text-4xl mt-4 text-red-500 font-bold">

                        {pendingOrders}

                    </p>

                </div>

            </div>

        </div>
    )
}

export default Analytics