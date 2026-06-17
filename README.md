[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/B74p-HKt)


# Sistema de Controle de Almoxarifado

## Descrição

Sistema web desenvolvido para controle de materiais em estoque utilizando HTML, CSS, JavaScript e MockAPI.

O sistema permite:

- Cadastrar materiais
- Listar materiais cadastrados
- Realizar baixa de estoque
- Excluir materiais
- Validar retiradas para evitar estoque negativo

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- MockAPI

---

## Funcionalidades

### Cadastro de Materiais

O usuário informa:

- Nome do material
- Quantidade em estoque

Os dados são enviados para a MockAPI utilizando o método POST.

---

### Listagem de Materiais

Ao carregar a página, os materiais cadastrados são exibidos automaticamente através de uma requisição GET.

---

### Baixa de Estoque

O usuário informa uma quantidade para retirada.

O sistema:

- Não permite valores negativos
- Não permite valor zero
- Não permite retirar mais do que existe em estoque

A atualização é realizada através de uma requisição PUT.

---

### Exclusão de Materiais

Os materiais podem ser removidos do sistema através do botão Excluir.

A remoção é realizada através de uma requisição DELETE.

---

## Estrutura do Projeto

```text
/
├── index.html
├── style.css
├── main.js
└── README.md
```

---

## Como Executar

1. Abrir o projeto no Visual Studio Code
2. Instalar a extensão Live Server
3. Abrir o arquivo index.html
4. Executar com Live Server

---

## Autor

Gabriel Lucas

Projeto desenvolvido para a disciplina de Engenharia de Software.