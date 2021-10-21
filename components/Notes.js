import { useEffect, useState } from "react";

export default function Notes({ token, userID }) {
  const [notes, setNotes] = useState([]);
  const [current, setCurrent] = useState(0);

  const getAverage = (c, m) => {
    let arr = notes[c]?.ensembleMatieres?.disciplines;
    return (
      Math.floor(
        (arr
          ?.map((n) =>
            n[m].length > 0 ? parseFloat(n[m].replace(",", ".")) : 0
          )
          .reduce((p, c) => p + c) /
          arr?.filter((n) => n[m].length > 0).length) *
          100
      ) / 100
    );
  };

  useEffect(() => {
    if (token.length > 0) {
      const fetchNotes = async () => {
        const res = await fetch(
          `https://api.ecoledirecte.com/v3/eleves/${userID}/notes.awp?verbe=get`,
          {
            method: "POST",
            body: `data={"token": "${token}"}`,
          }
        );
        const data = await res.json();
        setNotes(data?.data?.periodes);
      };
      fetchNotes();
    }
  }, [token, userID]);

  return (
    <div className="m-4 container mx-auto">
      {notes.length > 0 ? (
        <>
          <ul className="nav nav-tabs" style={{ borderBottom: "none" }}>
            {notes.map(({ periode }, i) => (
              <li className="nav-item" key={i}>
                <a
                  className={`nav-link ${i === current ? "active" : ""}`}
                  type="button"
                  onClick={() => setCurrent(i)}
                >
                  {periode}
                </a>
              </li>
            ))}
          </ul>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col" className="bg-light"></th>
                <th colSpan="4">MOYENNES</th>
              </tr>
              <tr>
                <th scope="col">DISCIPLINES</th>
                <th scope="col">Elève</th>
                <th scope="col">Classe</th>
                <th scope="col">Max</th>
                <th scope="col">Min</th>
              </tr>
            </thead>
            <tbody>
              {notes[current]?.ensembleMatieres?.disciplines
                .filter((d) => d.codeMatiere !== "")
                .map((matiere, i) => (
                  <tr key={i}>
                    <td scope="row">
                      <b>{matiere.discipline}</b>

                      {matiere.professeurs?.map((prof, i) => (
                        <small
                          key={i}
                          className="ms-2 fst-italic"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {prof?.nom}
                        </small>
                      ))}
                    </td>
                    <td>{matiere.moyenne}</td>
                    <td>{matiere.moyenneClasse}</td>
                    <td>{matiere.moyenneMax}</td>
                    <td>{matiere.moyenneMin}</td>
                  </tr>
                ))}
              <tr>
                <th scope="row">GENERALE</th>
                <td>{getAverage(current, "moyenne") || ""}</td>
                <td>{getAverage(current, "moyenneClasse") || ""}</td>
                <td colSpan="2" className="bg-light"></td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div className="w-100 text-center pt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
