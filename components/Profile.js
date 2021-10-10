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
        <img
          className="mx-auto mb-2"
          src={user?.profile?.photo.replace("//doc1", "https://doc1")}
          alt="photo"
          width="100"
          height="100"
          style={{ objectFit: "cover" }}
        />
        <p className="fs-3 my-1">
          {user.prenom} {user.nom}
        </p>
        <p className="text-muted my-1">{user.email}</p>
      </div>
    </>
  );
}
