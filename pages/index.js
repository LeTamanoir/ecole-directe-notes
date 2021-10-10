import { useState } from "react";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Notes from "../components/Notes";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://api.ecoledirecte.com/v3/login.awp", {
      method: "POST",
      body: `data={"identifiant": "${username}", "motdepasse": "${password}"}`,
    });

    const data = await res.json();
    setToken(data.token);
    setUser(data?.data?.accounts[0]);
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
      {!token ? (
        <Login
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          <Profile onLogout={onLogout} user={user} />
          <Notes token={token} />
        </>
      )}
      <footer className="mt-auto text-center">
        Martin Saldinger &copy; 2021
      </footer>
    </main>
  );
}
