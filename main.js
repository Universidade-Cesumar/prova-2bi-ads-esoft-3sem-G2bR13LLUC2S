const url = "https://6a29e555f59cb8f65f1db8fa.mockapi.io/materiais";

const botao = document.getElementById("btn-cadastrar");

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

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

                        <td>
                            <input
                                type="number"
                                id="input-retirada"
                                placeholder="Qtd"
                                min="1">
                        </td>

                        <td>
                            <button
                                class="btn-baixar"
                                data-id="${material.id}">
                                Baixar
                            </button>
                        </td>

                        <td>
                            <button
                                class="btn-excluir"
                                data-id="${material.id}">
                                Excluir
                            </button>
                        </td>
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
    .then(() => {

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        listarMateriais();

    })
    .catch(erro => {
        console.error("Erro ao cadastrar:", erro);
    });

});

/* DELETE */

document.addEventListener("click", (evento) => {

    if (evento.target.classList.contains("btn-excluir")) {

        const id = evento.target.dataset.id;

        fetch(`${url}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            listarMateriais();
        })
        .catch(erro => {
            console.error("Erro ao excluir:", erro);
        });

    }

});

/* PUT */

document.addEventListener("click", (evento) => {

    if (evento.target.classList.contains("btn-baixar")) {

        const linha = evento.target.closest("tr");

        const quantidadeRetirada = Number(
            linha.querySelector("#input-retirada").value
        );

        const estoqueAtual = Number(
            linha.children[1].textContent
        );

        const id = evento.target.dataset.id;

        if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {

            alert("Quantidade inválida para retirada!");

            return;
        }

        const novoEstoque = estoqueAtual - quantidadeRetirada;

        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantidade: novoEstoque
            })
        })
        .then(() => {
            listarMateriais();
        })
        .catch(erro => {
            console.error("Erro ao atualizar estoque:", erro);
        });

    }

});

listarMateriais();