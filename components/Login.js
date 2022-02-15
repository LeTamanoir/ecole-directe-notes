export default function Login({
  onSubmit,
  username,
  password,
  setUsername,
  setPassword,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto p-3 d-flex flex-column"
      style={{
        width: "20rem",
        marginTop: "10rem",
      }}
    >
      <img
        className="mb-4 mx-auto"
        src="/logo.png"
        alt=""
        width="173"
        height="113"
      />
      <p className="mb-3 text-center">
        Connectez-vous avec vos codes EcoleDirecte
      </p>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Identifiant"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="floatingInput">Identifiant</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Mot de passe</label>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" type="submit">
        Connexion
      </button>
    </form>
  );
}
