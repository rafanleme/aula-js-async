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

const getNotes = async () => {
  sectionNotas.innerHTML = "";

  try {
    const response = await fetch("https://fiap-notes-api.herokuapp.com/notes");
    const json = await response.json();

    addNotas(json);
  } catch (err) {
    showError(err);
  }
};

getNotes();

const createNote = async (event) => {
  event.preventDefault();
  try {
    await fetch("https://fiap-notes-api.herokuapp.com/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: novaNota.value }),
    });

    getNotes();
    form.reset();
  } catch (error) {
    showError("Houve um erro ao salvar");
  }
};

form.addEventListener("submit", createNote);
