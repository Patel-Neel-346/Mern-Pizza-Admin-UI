import { Outlet } from "react-router-dom"

const NonAuth = () => {
    return (
        <div>
            NonAuthComponent
            <Outlet />
        </div>
    )
}

export default NonAuth
