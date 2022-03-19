const sectionNotas = document.querySelector("#notas");

const form = document.querySelector("#form");
const novaNota = document.querySelector("#novaNota");

const addNota = (nota) => {
  const p = document.createElement("p");
  p.innerHTML = nota;
  sectionNotas.appendChild(p);
};

const addNotas = (notas) => notas.forEach((nota) => addNota(nota.text));

const showError = (err) => {
  const p = document.createElement("p");
  p.textContent = err;
  p.style.color = "red";
  sectionNotas.appendChild(p);
};

const getNotes = () => {
  fetch("https://fiap-notes-api.herokuapp.com/notes")
    .then((response) => response.json())
    .then((json) => addNotas(json))
    .catch((err) => showError(err));
};

getNotes();

const createNote = (event) => {
  event.preventDefault();
  fetch("https://fiap-notes-api.herokuapp.com/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: novaNota.value }),
  })
    .then((r) => {
      addNota(novaNota.value);
    })
    .finally(() => {
      form.reset();
    });
};

form.addEventListener("submit", createNote);
