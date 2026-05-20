import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function AdminLogin() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    username,
                    password
                }
            )

            console.log(response.data)

            localStorage.setItem(
                "token",
                response.data.token
            )

            navigate("/dashboard")

        } catch(error) {

            console.log(error)

            alert("Invalid Credentials")
        }
    }

    return (

        <div className="h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

                <h2 className="text-3xl font-bold mb-8 text-center">

                    Admin Login

                </h2>

                <div className="grid gap-5">

                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="p-4 border rounded-xl"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="p-4 border rounded-xl"
                    />

                    <button
                        onClick={login}
                        className="bg-green-600 text-white py-4 rounded-xl hover:bg-green-700">

                        Login

                    </button>

                </div>

            </div>

        </div>
    )
}

export default AdminLogin