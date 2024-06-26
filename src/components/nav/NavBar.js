import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    const localGuitarUser =localStorage.getItem("guitar_user")
    const guitarUserObject = JSON.parse(localGuitarUser)
//Create 4 navbar buttons.  Builder, My Guitars, Contact, and Logout
    

if (guitarUserObject.isAdmin) {
return(
    <ul className="navbar">
          

    <li className="navbar__item navbar__myGuitars">
        <Link className="navbar__link" to="/allorders" >All Orders</Link>
    </li>
    <li className="navbar__item navbar__Contact">
        <Link className="navbar__link" to="messages" >Messages</Link>
    </li>
    <li className="navbar__item navbar__logout">
        <Link className="navbar__link" to="" onClick={() => {
            localStorage.removeItem("guitar_user")
            navigate("/", {replace: true})
        }}>Logout</Link>
    </li>
</ul>
)
} else {    
    return (
    
        
        <ul className="navbar">
              <li className="navLogo">AxeLab</li>
          {  guitarUserObject.isAdmin ? "" : <li className="navbar__item navbar__Builder">
                <Link className="navbar__link" to=
                "/builder">Builder</Link>
            </li> }
            <li className="navbar__item navbar__myGuitars">
                <Link className="navbar__link" to="myGuitars" >My Guitars</Link>
            </li>
            <li className="navbar__item navbar__Contact">
                <Link className="navbar__link" to="contact" >Contact</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("guitar_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}
}
