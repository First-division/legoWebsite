import { Link, useMatch, useResolvedPath} from "react-router-dom";
import '../styles/navBar.css';

export default function NavBar() {
    return (
        <nav className="nav">
            <div className="nav-left">
                <Link to="/homePage" className="site-title">C n K Designs</Link>
            </div>
            <div className="nav-center">
                <ul>
                    <CustomLink to="/legoPage">Lego</CustomLink>
                    <CustomLink to="/customsPage">Customs</CustomLink>
                    <CustomLink to="/About">About</CustomLink>
                    <CustomLink to="/contact">Contact</CustomLink>
                </ul>
            </div>
        </nav>
    );
}

import type { AnchorHTMLAttributes, ReactNode } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

// function customLink({ to, children, ...props }) {
//     return (
//         <li>
//             <a to={to} >{children}</a>
//         </li>
//     )
// }