const sectionNotas = document.querySelector("#notas");

const addNotas = (notas = []) => {
    notas.forEach(nota => {
        const p = document.createElement("p");
        p.innerHTML = nota.text;
        sectionNotas.appendChild(p);
    })
}

// XMLHttpRequest
const doRequestAjax = () => {
    return new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://fiap-notes-api.herokuapp.com/notes");
        xmlHttp.responseType = "json";
        
        xmlHttp.onload = () => {
            if(xmlHttp.status !== 200)
                reject("Houve um erro na requisição " + xmlHttp.status);
            else
                resolve(xmlHttp.response);
        }
    
        xmlHttp.onerror = () => {
            reject("Houve um erro na requisição, verifique a conexão!");
        }
    
        xmlHttp.send();
    });
}

const showError = (err) => {
    const p = document.createElement("p");
    p.textContent = err;
    p.style.color = "red";
    sectionNotas.appendChild(p);
}

doRequestAjax().then((response) => {
    addNotas(response);
}).catch(err => showError(err));

