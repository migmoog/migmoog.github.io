import { Link } from "react-router-dom";

function NavbarItem({ text, route }) {
    return (
        <Link to={route} className="navbar-link">
            <div className="navbar-item">
                {text}
            </div>
        </Link>
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