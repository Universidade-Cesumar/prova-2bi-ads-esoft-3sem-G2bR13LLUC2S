const url = "https://6a29e555f59cb8f65f1db8fa.mockapi.io/materiais";

const botao = document.getElementById("btn-cadastrar");
const campoBusca = document.getElementById("input-busca");

function validarRetirada(estoqueAtual, quantidadeRetirada) {

    if (quantidadeRetirada <= 0) {
        return false;
    }

    if (quantidadeRetirada > estoqueAtual) {
        return false;
    }

    return true;
}

async function listarMateriais() {

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const textoBusca = campoBusca.value.toLowerCase();

        document.getElementById("total-itens").textContent =
            `Total de itens: ${dados.length}`;

        const tbody = document.querySelector("#lista-materiais tbody");

        tbody.innerHTML = "";

        dados
            .filter(material =>
                material.nome.toLowerCase().includes(textoBusca)
            )
            .forEach(material => {

                const quantidade = Number(material.quantidade);

                const classeEstoque =
                    quantidade < 10 ? "estoque-critico" : "";

                tbody.innerHTML += `
                    <tr class="${classeEstoque}">
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

    } catch (erro) {
        console.error("Erro ao listar materiais:", erro);
        alert("Erro ao carregar materiais. Verifique sua conexão com a internet.");
    }
}

botao.addEventListener("click", async () => {

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

    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(material)
        });

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        listarMateriais();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao cadastrar material. Verifique sua conexão.");
    }
});

document.addEventListener("click", async (evento) => {

    if (evento.target.classList.contains("btn-excluir")) {

        const id = evento.target.dataset.id;

        try {
            await fetch(`${url}/${id}`, {
                method: "DELETE"
            });

            listarMateriais();

        } catch (erro) {
            console.error("Erro ao excluir:", erro);
            alert("Erro ao excluir material. Verifique sua conexão.");
        }
    }
});

document.addEventListener("click", async (evento) => {

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

        try {
            await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantidade: novoEstoque
                })
            });

            listarMateriais();

        } catch (erro) {
            console.error("Erro ao atualizar estoque:", erro);
            alert("Erro ao atualizar estoque. Verifique sua conexão.");
        }
    }
});

campoBusca.addEventListener("input", () => {
    listarMateriais();
});

listarMateriais();