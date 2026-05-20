import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext)

    const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 0
    )

    return (
        <section className="min-h-screen bg-gray-50 px-6 md:px-16 py-12">

            {/* Header */}
            <h2 className="text-4xl font-extrabold text-green-700 mb-2">
                🛒 Your Cart
            </h2>
            <p className="text-gray-500 mb-8">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
            </p>

            {cartItems.length === 0 ? (

                /* Empty State */
                <div className="flex flex-col items-center justify-center mt-24 text-center">
                    <span className="text-8xl mb-6">🛒</span>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        Your cart is empty
                    </h3>
                    <p className="text-gray-400">
                        Add some Goli Soda flavors to get started!
                    </p>
                </div>

            ) : (

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {cartItems.map(item => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300"
                            >

                                {/* Item Info */}
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {item.name}
                                    </h3>
                                    <p className="text-green-600 font-semibold">
                                        ₹{item.price} each
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition"
                                        >
                                            −
                                        </button>

                                        <span className="text-lg font-bold w-6 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side: Subtotal + Remove */}
                                <div className="flex flex-col items-end gap-3">
                                    <p className="text-xl font-extrabold text-gray-800">
                                        ₹{item.price * item.quantity}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-red-50 text-red-500 border border-red-200 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white shadow-md rounded-2xl p-6 h-fit sticky top-6">
                        <h3 className="text-xl font-extrabold text-gray-800 mb-4">
                            Order Summary
                        </h3>

                        <div className="flex flex-col gap-2 text-gray-600 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span className="text-green-600 font-semibold">Free</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 flex justify-between text-lg font-extrabold text-gray-800">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full shadow-lg transition duration-300">
                            Proceed to Checkout
                        </button>

                        <button className="mt-3 w-full border-2 border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-400 font-semibold py-2.5 rounded-full transition duration-300">
                            Clear Cart
                        </button>
                    </div>

                </div>
            )}

        </section>
    )
}

export default Cart