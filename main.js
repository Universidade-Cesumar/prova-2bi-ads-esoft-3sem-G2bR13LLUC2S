const url = "https://6a29e555f59cb8f65f1db8fa.mockapi.io/materiais";

const botao = document.getElementById("btn-cadastrar");

function listarMateriais() {

    fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {

            const tbody = document.querySelector("#lista-materiais tbody");

            tbody.innerHTML = "";

            dados.forEach(material => {

                tbody.innerHTML += `
                    <tr>
                        <td>${material.nome}</td>
                        <td>${material.quantidade}</td>
                    </tr>
                `;

            });

        })
        .catch(erro => {
            console.error("Erro ao listar materiais:", erro);
        });

}

botao.addEventListener("click", () => {

    const nome = document.getElementById("input-nome").value;
    const quantidade = document.getElementById("input-quantidade").value;

    if (nome === "" || quantidade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const material = {
        nome: nome,
        quantidade: quantidade
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(material)
    })
    .then(resposta => resposta.json())
    .then(dados => {

        console.log("Material cadastrado:", dados);

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        listarMateriais();

    })
    .catch(erro => {
        console.error("Erro ao cadastrar:", erro);
    });

});

listarMateriais();