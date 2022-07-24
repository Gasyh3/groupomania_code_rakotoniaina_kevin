import "./Header.scss";
import logo from "../../assets/img/icon-left-font-monochrome-white.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

/**
 * It returns a div with a class of header, which contains a div with a class of header__content, which
 * contains an a tag with a class of header__link, which contains an img tag with a class of
 * header__logo, which contains the logo image
 * @param props - an object that contains all the props that were passed to the component.
 * @returns A div with a className of header.
 */
export default function Header(props) {
  return (
    <div className="header">
      <div className="header__content">
        <a className="header__link" href="http://localhost:3000">
          {" "}
          <img
            className="header__logo"
            src={logo}
            alt="logo de Groupomania"
          ></img>{" "}
        </a>

        {props.isLoggedIn ? (
          <Link className="header__settings" to={"profile"}>
            <FontAwesomeIcon className="header__icon" icon={faGear} />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
