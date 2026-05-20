import { Link } from "react-router-dom"

function AdminDashboard() {

    return (

        <div className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold mb-10">

                Admin Dashboard

            </h1>

            <div className="grid md:grid-cols-3 gap-8">

                <Link
                    to="/admin/products"
                    className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition duration-300"
                >

                    <h2 className="text-2xl font-bold">

                        Products

                    </h2>

                    <p className="mt-4">

                        Manage products

                    </p>

                </Link>

                <Link
                    to="/admin/orders"
                    className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition duration-300"
                >

                    <h2 className="text-2xl font-bold">

                        Orders

                    </h2>

                    <p className="mt-4">

                        Manage orders

                    </p>

                </Link>

                <Link
                    to="/admin/analytics"
                    className="bg-white shadow-xl rounded-2xl p-8 hover:scale-105 transition duration-300"
                >

                    <h2 className="text-2xl font-bold">

                        Analytics

                    </h2>

                    <p className="mt-4">

                        View business insights

                    </p>

                </Link>

            </div>

        </div>
    )
}

export default AdminDashboard