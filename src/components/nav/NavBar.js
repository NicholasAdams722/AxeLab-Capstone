import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
//Create 4 navbar buttons.  Builder, My Guitars, Contact, and Logout
    return (
        <ul className="navbar">
            <li className="navbar__item navbar__Builder">
                <Link className="navbar__link" to=
                "/builder">Builder</Link>
            </li>
            <li className="navbar__item navbar__myGuitars">
                <Link className="navbar__link" to="/myguitars" >My Guitars</Link>
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

