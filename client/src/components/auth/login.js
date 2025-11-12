import { useState ,useEffect} from "react"
import {useLoginMutation} from "./authApiSlice"
import {setToken} from "./authSlice"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import '../../css/Login.css';

const Login =()=>{

    const dispatch= useDispatch()
    const navigate= useNavigate()
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const [login,{data,isSuccess,isError,error,isLoading}]=useLoginMutation()
    // if(isLaoding) return <p>laoding</p>
    // if(isError) return <p>error</p>

    
    useEffect(()=>{
        if(isSuccess){
            dispatch(setToken(data))
            navigate("/")
        }
    },[isSuccess])
    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        login({userName,password})
    }
    return(
        <div className="login-container"> 
            <h1>התחבר</h1>
            <form onSubmit={handleSubmit}>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2 mb-3">
                <InputText placeholder="שם משתמש" required onChange={(e) => setUserName(e.target.value)} type="text" id="username" aria-describedby="username-help" />
                <small id="username-help">
                    
                </small>
            </div>
        </div>
                 
                {/* <input placeholder="שם משתמש" required onChange={(e) => setUserName(e.target.value)} type="text" ></input> */}
                <div className="flex flex-column gap-2 mb-3">
                {/* <input placeholder="סיסמא" required onChange={(e) => setPassword(e.target.value)} type="text" ></input> */}
                {/* <Password placeholder="סיסמא" required onChange={(e) => setPassword(e.target.value)} type="text" /> */}
                <Password placeholder="סיסמא" value={password} required onChange={(e) => setPassword(e.target.value)} toggleMask />
                </div>
                {/* <button type="submit">התחבר</button> */}
                <Button  label="התחבר" text raised />
                
            </form>
            
            {isLoading && <p style={{ color: "blue" }}>טוען...</p>}
            
            {isError && (
                alert(JSON.stringify(error))
                // <p style={{ color: "red" }}>
                //     שגיאה: {error?.data?.message || "אירעה שגיאה לא צפויה"}
                //  </p>
            )}
            </div>
                    
    )
}
     

export default Login