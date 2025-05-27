import { Link } from "react-router-dom";

function NavbarItem({ text, route }) {
    return (
        <div className="navbar-item">
            <Link to={route} className="navbar-link">
                <p className="navbar-text">
                    {text}
                </p>
            </Link>
        </div>
    );
}
export default function Navbar() {
    return (
        <div className="navbar">
            <NavbarItem text="Home" route="/" />
            <NavbarItem text="Projects" route="/projects" />
            <NavbarItem text="About" route="/about" />
        </div>
    );
}