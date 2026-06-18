let form = document.getElementById("form");
let resultado = document.getElementById("matriculados");

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    let nome = document.getElementById("id_nome").value;
    let matricula = document.getElementById("id_matricula").value;
    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    let curso = {
        nome: nome,
        matricula: matricula
    };

    cursos.push(curso);
    form.reset();
    localStorage.setItem("cursos", JSON.stringify(cursos));
    listar();
});

function listar() {
    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    resultado.innerHTML = "<legend>Fila de espera</legend>";

    if (cursos.length === 0) {
        resultado.innerHTML += "Nenhum curso cadastrado";
        return;
    }

     for (let i = 0; i < cursos.length; i++) { 
            resultado.innerHTML += `
                <p>
                   <strong>Nome:</strong> ${cursos[i].nome}<br>
                <strong>Matrícula:</strong> ${cursos[i].matricula}<br>
                <button onclick="editar(${i})">Editar</button>
                <button onclick="deletar(${i})">Excluir</button>
                </p>
                <hr>
            `;
        }
    }


function editar(indice) {
    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    
    let novoNome = prompt("Digite o nome novo", cursos[indice].nome);
    let novaMatricula = prompt("Digite a sua nova matricula", cursos[indice].matricula);

    if (novoNome === null || novaMatricula === null) {
        return;
    }

    cursos[indice].nome = novoNome;
    cursos[indice].matricula = novaMatricula;

   localStorage.setItem("cursos", JSON.stringify(cursos));
    
    listar();
}

function deletar(indice) {
   let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    cursos.splice(indice, 1);

    localStorage.setItem("cursos", JSON.stringify(cursos));

    listar();
}