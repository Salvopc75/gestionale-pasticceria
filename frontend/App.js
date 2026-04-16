
import { useEffect, useState } from "react";

export default function App() {
  const [prodotti, setProdotti] = useState([]);
  const [nome, setNome] = useState("");

  const carica = async () => {
    const res = await fetch("http://localhost:3001/prodotti");
    const data = await res.json();
    setProdotti(data);
  };

  useEffect(() => { carica(); }, []);

  const aggiungi = async () => {
    await fetch("http://localhost:3001/prodotti", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ nome, quantita: 0 })
    });
    setNome("");
    carica();
  };

  return (
    <div style={{padding:20}}>
      <h1>Gestionale Pasticceria PRO</h1>

      <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome prodotto"/>
      <button onClick={aggiungi}>Aggiungi</button>

      <ul>
        {prodotti.map(p => (
          <li key={p.id}>{p.nome} - {p.quantita}</li>
        ))}
      </ul>
    </div>
  );
}
