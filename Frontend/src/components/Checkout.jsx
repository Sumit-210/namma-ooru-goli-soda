import { useContext, useState } from "react"
import toast from "react-hot-toast"
import api from "../services/api"
import { CartContext } from "../context/CartContext"

const fields = [
    {
        name: "shopName",
        label: "Shop Name",
        placeholder: "e.g. Sunrise General Store",
        type: "text",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
            </svg>
        ),
    },
    {
        name: "ownerName",
        label: "Owner Name",
        placeholder: "e.g. Ravi Kumar",
        type: "text",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        name: "phone",
        label: "Phone Number",
        placeholder: "e.g. 9876543210",
        type: "tel",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        name: "location",
        label: "Delivery Location",
        placeholder: "e.g. Koramangala, Bengaluru",
        type: "text",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
]

function validate(formData) {
    const errors = {}
    if (!formData.shopName.trim()) errors.shopName = "Shop name is required"
    if (!formData.ownerName.trim()) errors.ownerName = "Owner name is required"
    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
        errors.phone = "Enter a valid 10-digit phone number"
    }
    if (!formData.location.trim()) errors.location = "Location is required"
    return errors
}

function Checkout() {
    const { cartItems } = useContext(CartContext)

    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        phone: "",
        location: "",
    })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        const updated = { ...formData, [name]: value }
        setFormData(updated)
        if (touched[name]) {
            const newErrors = validate(updated)
            setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
        const newErrors = validate(formData)
        setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
    }

    const placeOrder = async () => {
        const allTouched = fields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {})
        setTouched(allTouched)
        const validationErrors = validate(formData)
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix the errors before placing your order.")
            return
        }
        if (!cartItems || cartItems.length === 0) {
            toast.error("Your cart is empty.")
            return
        }

        setLoading(true)
        try {
            const orderData = {
                shopName: formData.shopName,
                ownerName: formData.ownerName,
                phone: formData.phone,
                location: formData.location,
                items: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
            }
            const response = await api.post("/orders", orderData)
            toast.success("Order placed successfully!")
            window.location.href = response.data.whatsappUrl
        } catch (error) {
            console.error(error)
            const message = error?.response?.data?.message || "Something went wrong. Please try again."
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    const totalItems = cartItems?.reduce((sum, i) => sum + i.quantity, 0) ?? 0

    return (
        <section className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-lg mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-green-600 mb-1">
                        Almost there
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
                    {totalItems > 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
                        </p>
                    )}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <h3 className="text-base font-semibold text-gray-700 mb-5">Delivery Details</h3>

                    <div className="space-y-5">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    {field.label}
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {field.icon}
                                    </span>
                                    <input
                                        id={field.name}
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                                            errors[field.name] && touched[field.name]
                                                ? "border-red-400 focus:ring-red-100 bg-red-50"
                                                : "border-gray-300 focus:ring-green-100 focus:border-green-500 bg-white"
                                        }`}
                                    />
                                </div>
                                {errors[field.name] && touched[field.name] && (
                                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-gray-100" />

                    {/* WhatsApp note */}
                    <p className="text-xs text-gray-400 flex items-start gap-2 mb-5">
                        <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.804a.5.5 0 00.61.61l5.959-1.47A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.827 9.827 0 01-5.003-1.368l-.359-.213-3.723.918.934-3.617-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                        </svg>
                        You'll be redirected to WhatsApp to confirm your order after placing it.
                    </p>

                    {/* Submit */}
                    <button
                        onClick={placeOrder}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm"
                    >
                        {loading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Placing Order…
                            </>
                        ) : (
                            <>
                                Place Order
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Checkout