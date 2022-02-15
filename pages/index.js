import { useState } from "react";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Notes from "../components/Notes";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("https://api.ecoledirecte.com/v3/login.awp", {
      method: "POST",
      body: `data={"identifiant": "${username}", "motdepasse": "${password}"}`,
    });

    const data = await res.json();
    setToken(data.token);
    if (data.code === 200) setUser({ user: data?.data?.accounts[0] });
    else setError(data.message);
  };

  const onLogout = () => {
    setUser({});
    setToken("");
  };

  return (
    <main
      className="d-flex flex-column"
      style={{ width: "100%", minHeight: "100vh" }}
    >
      {token && user.user ? (
        <>
          <Profile onLogout={onLogout} user={user.user} />
          <Notes token={token} userID={user.user.id} />
        </>
      ) : (
        <Login
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
          onSubmit={onSubmit}
          error={error}
        />
      )}
      <footer className="mt-auto text-center">
        Martin Saldinger &copy; 2021
      </footer>
    </main>
  );
}
