import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"

function Navbar() {
    const { cartItems } = useContext(CartContext)
    const [menuOpen, setMenuOpen] = useState(false)

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity, 0
    )

    const links = [
        { label: "Home", href: "#home" },
        { label: "Products", href: "#products" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ]

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">

            {/* Main bar */}
            <div className="flex items-center justify-between px-4 py-4 md:px-8 max-w-6xl mx-auto">

                {/* Logo */}
                <h1 className="text-xl md:text-2xl font-bold text-green-600 tracking-tight">
                    Goli Soda
                </h1>

                {/* Desktop links — center */}
                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                    {links.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="hover:text-green-600 transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right side — cart + hamburger */}
                <div className="flex items-center gap-3">

                    {/* Cart */}
                    <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors" aria-label="Cart">
                        <span className="text-xl">🛒</span>
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Hamburger — mobile only */}
                    <button
                        className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px] w-5" : "w-5"}`} />
                        <span className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0 w-5" : "w-4"}`} />
                        <span className={`block h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px] w-5" : "w-5"}`} />
                    </button>

                </div>
            </div>

            {/* Mobile dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64" : "max-h-0"}`}>
                <div className="border-t border-gray-100 px-4 pb-2">
                    {links.map((link, i) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center py-3.5 text-[15px] font-medium text-gray-700 hover:text-green-600 transition-colors ${i < links.length - 1 ? "border-b border-gray-50" : ""}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

        </nav>
    )
}

export default Navbar