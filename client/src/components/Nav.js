import {Link,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import useAuth from './auth/useAuth';



const Nav = ()=>{
const {isUserLoggedIn}= useSelector((state)=> state.auth)
const obj=useAuth()
const role= obj?.role
    const items = [
        !isUserLoggedIn &&{ label: 'דף הבית', icon: 'pi pi-home' ,url:"/"},
        !isUserLoggedIn &&{ label: 'התחברות', icon: 'pi pi-sign-in' ,url:"/login"},
         isUserLoggedIn &&{ label: 'התנתק', icon: 'pi pi-sign-out' ,url:"/logOut"},
        !isUserLoggedIn &&{ label: 'הרשמה', icon: 'pi pi-chart-line' ,url:"/register"},
         isUserLoggedIn &&{ label: 'דירות', icon: 'pi pi-list' ,url:"/appartments"},
         isUserLoggedIn &&{  icon: 'pi pi-shopping-cart' ,url:"/basket"},
         isUserLoggedIn &&{  label: 'הוספת דירות',icon: 'pi pi-calendar-plus' ,url:"/addAppartments"}
            ];//role=="Admin"&&

    return(
        
            <div className="card">
                {console.log(role)}
            <TabMenu model={items} />
            </div>
            // {/* <div> */}
            //  {/* {!isUserLoggedIn &&<Link to="/">דף הבית </Link>}
            //  {!isUserLoggedIn &&<Link to="/login">התחברות </Link>}
            //  {isUserLoggedIn &&<Link to="/logOut">התנתק </Link>}
            //  {!isUserLoggedIn &&<Link to="/register">הרשמה </Link>}
            //  {!isUserLoggedIn &&<Link to="/appartments">דירות </Link>}
            //  {isUserLoggedIn &&<Link to="/basket">סל</Link>}
            //  </div> */}
        
    )
}
export default Nav;