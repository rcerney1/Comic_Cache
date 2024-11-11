import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();
  return (
    <nav>
      <ul className="nav-bar-elements">
        <li>
          <NavLink to="/">
            <img src='/comic.png' alt="Logo" className="logo" />
            Comic Cache
          </NavLink>
        </li>

        {user && (
          <li>
            <button onClick={() => navigate("favorites")}>
              <MdFavorite />
            </button>
          </li>
        )}

        {user && (
          <li>
            <button onClick={() => navigate("cart")}>
              <FaShoppingCart />
            </button>
          </li>
        )}

        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
