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
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://fiap-notes-api.herokuapp.com/notes");
    xmlHttp.responseType = "json";
    
    xmlHttp.onload = () => {
        if(xmlHttp.status !== 200){
            const p = document.createElement("p");
            p.textContent = "Houve um erro na requisição " + xmlHttp.status;
            p.style.color = "red";
            sectionNotas.appendChild(p);
        }
        else
            addNotas(xmlHttp.response);
        
    }

    xmlHttp.onerror = () => {
        console.log(xmlHttp.response);
    }

    xmlHttp.send();
}

doRequestAjax();
