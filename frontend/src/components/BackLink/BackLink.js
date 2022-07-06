import { Link } from "react-router-dom";
import "./BackLink.scss";

function BackLink() {
  return (
    <Link className="backLink" to="/">
      <p className="backLink__text">Retour à la page principal</p>
    </Link>
  );
}

export default BackLink;
