import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Posts from "./pages/Posts/Posts";
import Header from "./components/Header/Header";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUp from "./components/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import "./styles/normalize.css";

function App() {
  const [username, setUsername] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("loggedInUser"));
    }
  }, []);

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        setUsername={setUsername}
        username={username}
      />
      <Routes>
        <Route path="/" element={<Posts username={username} />} />

        <Route
          path="profile"
          element={
            <Profile
              username={username}
              setUsername={setUsername}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route path="login" element={<Login />}>
          <Route
            path="signIn"
            element={
              <SignInForm
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
              />
            }
          />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
