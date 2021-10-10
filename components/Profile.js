export default function Profile({ onLogout, user }) {
  return (
    <>
      <button
        className="ms-auto me-2 mt-2 btn btn-sm btn-danger"
        onClick={onLogout}
      >
        Déconnexion
      </button>

      <div className="mt-3 text-center">
        <p className="fs-3 mb-1">
          {user.prenom} {user.nom}
        </p>
        <p className="text-muted my-1">{user.email}</p>
      </div>
    </>
  );
}
