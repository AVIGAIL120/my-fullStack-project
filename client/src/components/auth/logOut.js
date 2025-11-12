import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeToken } from "./authSlice"
import apiSlice from "../../app/apiSlice"


const LogOut= ()=>{
    const {isUserLoggedIn}= useSelector((state)=> state.auth)
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const handleLogoutClick = ()=>{
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/login");
    }
    return(
        <nav>
            <ul>
                {isUserLoggedIn && <li>
                    <a onClick={handleLogoutClick}>
                       LogOut </a></li>}
            </ul>
        </nav>
    )
}
export default LogOut