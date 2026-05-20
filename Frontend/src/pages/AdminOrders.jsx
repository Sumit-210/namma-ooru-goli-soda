import { useEffect, useState } from "react"

import api from "../services/api"

function AdminOrders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {

        fetchOrders()

    }, [])

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token")

const response = await api.get("/orders", {

    headers: {

        Authorization: `Bearer ${token}`

    }

})

            console.log(response.data)

            setOrders(response.data)

        } catch(error) {

            console.log(error)
        }
    }

    const updateStatus = async(id, status) => {

        try {

            await api.put(
                `/orders/${id}/status?status=${status}`
            )

            fetchOrders()

        } catch(error) {

            console.log(error)
        }
    }

    const deleteOrder = async(id) => {

        try {

            await api.delete(`/orders/${id}`)

            fetchOrders()

        } catch(error) {

            console.log(error)
        }
    }

    return (

        <section className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-10 text-center">

                Admin Orders

            </h1>

            {
                orders.length === 0

                ? (

                    <p className="text-center text-xl">

                        No Orders Found

                    </p>
                )

                : (

                    <div className="grid gap-6">

                        {
                            orders.map(order => (

                                <div
                                    key={order.id}
                                    className="bg-white p-6 rounded-2xl shadow-lg">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                Order #{order.id}

                                            </h2>

                                            <p className="mt-2">

                                                ownerName:
                                                {" "}
                                                {order.ownerName}

                                            </p>

                                            <p>

                                                Phone:
                                                {" "}
                                                {order.phone}

                                            </p>

                                            <p>

                                                location:
                                                {" "}
                                                {order.location}

                                            </p>

                                            <p className="font-bold mt-2">

                                                Status:
                                                {" "}
                                                {order.status}

                                            </p>

                                        </div>

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "CONFIRMED"
                                                    )
                                                }
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg">

                                                Confirmed

                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order.id,
                                                        "DELIVERED"
                                                    )
                                                }
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg">

                                                Delivered

                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteOrder(order.id)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg">

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                    <div className="mt-5">

                                        <h3 className="text-xl font-bold mb-3">

                                            Items

                                        </h3>

                                        {
    order.items.map(item => (

        <div
            key={item.id}
            className="flex justify-between border-b py-2">

            <div>

                <p className="font-bold">
                    {item.product.name}
                </p>

                <p>
                    Flavor: {item.product.flavor}
                </p>

                <p>
                    ₹ {item.product.price}
                </p>

            </div>

            <p>
                Qty: {item.quantity}
            </p>

        </div>
                                            ))
                                        }

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                )
            }

        </section>
    )
}

export default AdminOrders