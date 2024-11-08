import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import rolesAccess from "../../../utils/user-specific/roles-access";

const symbolsLimit = 25;
const Limiter = (x: string)
    : string => x.length > symbolsLimit ? `${x.slice(0, symbolsLimit)}...` : x;

const accessLevel = rolesAccess.guest;
const Header = () => {
    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to={routes[0].path}>
                        {routes[0].name}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            routes.slice(1).map(x =>
                                accessLevel.includes(x.accessLevel) &&
                                (
                                    x.nested ?
                                        <NavDropdown key={x.path} title={Limiter(x.name)}>
                                            {
                                                x.nested.map(x2 =>
                                                    <NavDropdown.Item as={Link} key={`${x2.path}${x2.name}`} to={`${x.path}${x2.path}`}>
                                                        {Limiter(x2.name)}
                                                    </NavDropdown.Item>
                                                )
                                            }
                                        </NavDropdown>
                                        :
                                        x.component &&
                                        <Nav.Item key={`${x.path}${x.name}`}>
                                            <Link className="nav-link" to={x.path}>{Limiter(x.name)}</Link>
                                        </Nav.Item>
                                )
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;