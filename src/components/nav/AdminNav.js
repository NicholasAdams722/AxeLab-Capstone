import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
          

            <li className="navbar__item navbar__myGuitars">
                <Link className="navbar__link" to="/myGuitars" >All Orders</Link>
            </li>
            <li className="navbar__item navbar__Contact">
                <Link className="navbar__link" to="contact" >Messages</Link>
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