
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let prodotti = [];
let movimenti = [];

// GET prodotti
app.get("/prodotti", (req, res) => {
  res.json(prodotti);
});

// ADD prodotto
app.post("/prodotti", (req, res) => {
  const p = { id: Date.now(), ...req.body };
  prodotti.push(p);
  res.json(p);
});

// CARICO
app.post("/carico", (req, res) => {
  const { id, quantita } = req.body;
  prodotti = prodotti.map(p =>
    p.id === id ? { ...p, quantita: p.quantita + quantita } : p
  );
  movimenti.push({ tipo: "CARICO", id, quantita });
  res.send("OK");
});

// SCARICO
app.post("/scarico", (req, res) => {
  const { id, quantita } = req.body;
  prodotti = prodotti.map(p =>
    p.id === id ? { ...p, quantita: p.quantita - quantita } : p
  );
  movimenti.push({ tipo: "SCARICO", id, quantita });
  res.send("OK");
});

app.listen(3001, () => console.log("Backend PRO attivo su 3001"));
