import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import InputValidation from "../../components/InputValidation/InputValidation";
import PasswordMeter from "../../components/PasswordMeter/PasswordMeter";
import Button from "../../components/Button/Button";
import "./Profile.scss";

function Profile(props) {
  const [username, setUsername] = useState();
  const [avatar, setavatar] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepetedPassword] = useState("");
  const [passwordDifferenceMessage, setPasswordDifferenceMessage] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [displayDeleteWarning, setDisplayWarning] = useState(false);
  const [userDeletedMessage, setUserDeletedMessage] = useState();

  const getFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  let formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("image", image.data);

  const checkPasswords = () => {
    if (password !== repeatedPassword) {
      setPasswordDifferenceMessage("Les mots de passe ne sont pas identiques");
    } else {
      setPasswordDifferenceMessage("");
    }
  };

  const modifyProfile = () => {
    fetch(`http://localhost:3001/api/auth/${props.username}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((value) => {
        if (value.username !== undefined) {
          props.setUsername(value.username);
          localStorage.setItem("loggedInUser", value.username);
        }
        setIsInEditMode(false);
      });
  };
  const deleteProfile = () => {
    fetch("http://localhost:3001/api/auth/", {
      method: "DELETE",
      credentials: "include",
    }).then((resp) => {
      if (resp.ok) {
        function goToSignup() {
          logout(); // remove cookie and localStorage
          navigate("/login/signUp");
        }
        setUserDeletedMessage(
          "Votre compte a été supprimé, vous allez être redirigé vers la page d'inscription"
        );
        setTimeout(goToSignup, 5000);
      }
    });
  };

  useEffect(
    () => {
      fetch(`http://localhost:3001/api/auth/private/${props.username}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((value) => {
          setavatar(value.result.avatarUrl);
          setEmail(value.result.email);
        });
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const navigate = useNavigate();
  const logout = () => {
    fetch("http://localhost:3001/api/auth/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => {
      props.setIsLoggedIn(false);
      props.setUsername("");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("privilege");
      navigate("/login/signIn");
    });
  };

  return (
    <div className="profile">
      {userDeletedMessage !== undefined ? (
        <p>{userDeletedMessage}</p>
      ) : (
        <div>
          {isInEditMode ? (
            <div className="profile__edit">
              <h1 className="title">Modifier votre profil</h1>
              <div className="userAndEmail">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  className="input"
                  placeholder={props.username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                ></input>

                <label htmlFor="email">Adresse email</label>
                <input
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={email}
                  type="text"
                ></input>
              </div>
              <InputValidation
                label="password"
                checks={["valueMissing"]}
                inputProps={{ type: "password", required: true }}
                labelText="Mot de passe"
                id="password"
                errorMessage="Veuillez renseigner un mot de passe"
                setValue={setPassword}
                MeterPasswordStrengthMeter
                checkPasswords={checkPasswords}
              />

              <InputValidation
                label="repeatedPassword"
                checks={["valueMissing"]}
                inputProps={{ type: "password", required: true }}
                labelText="Répétez le mot de passe"
                id="password"
                errorMessage="Vérification du mot de passe"
                setValue={setRepetedPassword}
                MeterPasswordStrengthMeter
                checkPasswords={checkPasswords}
              />
              <p className="passwordWarning">{passwordDifferenceMessage}</p>
              <PasswordMeter password={password} />
              <p>Modifier la photo de profile</p>
              <input
                className="fileInput"
                type={"file"}
                name={"image"}
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={getFile}
              />
              <label htmlFor="image">
                <FontAwesomeIcon icon={faUpload} /> Choisir un fichier
              </label>

              {image.preview !== "" ? (
                <img
                  src={image.preview}
                  alt="avatar"
                  width="100"
                  height="auto"
                />
              ) : (
                ""
              )}

              <div className="profile_buttonsContainer">
                <Button
                  className="modifyProfileButton"
                  onClick={modifyProfile}
                  action="Valider les modifications"
                />
                <Button
                  className="cancelModificationsButton"
                  onClick={() => setIsInEditMode(false)}
                  action="Annuler les modifications"
                />
              </div>
            </div>
          ) : (
            // Not in edit mode
            <div className="profile__notInEditMode">
              <div className="profile__info">
                <span className="profile__info--avatar">
                  {avatar !== undefined ? (
                    <img
                      className="avatar"
                      src={`http://localhost:3001/images/${avatar}`}
                      alt="avatar"
                    ></img>
                  ) : (
                    ""
                  )}
                </span>
                <div className="profile__info--row">
                  <p className="profile__info--text">
                    <span className="profile-bold">Pseudo :</span>{" "}
                    {props.username}
                  </p>
                  <p className="profile__info--text">
                    <span className="profile-bold">E-mail :</span> {email}
                  </p>
                </div>
                <div className="profile__buttonBlock">
                  <Button
                    className="modifyProfileButton"
                    onClick={() => setIsInEditMode(true)}
                    action="Modifier le profil"
                  />
                  <Button
                    className="logoutButton"
                    onClick={logout}
                    action={"Se déconnecter"}
                  />
                </div>
              </div>

              <div className="deleteBlock">
                <p className="deleteBlock__text">
                  Voulez-vous supprimer votre profile ?
                </p>
                <Button
                  className="deleteButton"
                  onClick={() => setDisplayWarning(true)}
                  action={"Supprimer le compte"}
                />
              </div>
              {displayDeleteWarning ? (
                <div className="deleteWarning__container">
                  <strong className="deleteWarning">
                    Voulez-vous vraiment supprimer votre compte Groupomania ?
                  </strong>
                  <Button
                    className="cancelDeleteButton"
                    onClick={() => setDisplayWarning(false)}
                    action={"Non, annuler la demande"}
                  />
                  <Button
                    className="deleteButton"
                    onClick={deleteProfile}
                    action={"Oui, supprimer mon compte"}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
