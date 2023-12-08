import {Link} from "react-router-dom";

function Navigation(props) {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>/</li>
                {props.children}
            </ul>
        </nav>
    )
}

export default Navigation;