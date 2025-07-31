import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/store"

const NonAuth = () => {

    const { user } = useAuthStore()

    if (user !== null) {
        return <Navigate to="/" replace={true} />
    }
    return (
        <div>
            NonAuthComponent
            <Outlet />
        </div>
    )
}

export default NonAuth
