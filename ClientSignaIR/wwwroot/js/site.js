var usuario;
var connection;

async function CreateConnection(nome) {
    connection = new signalR.HubConnectionBuilder().withUrl("hub/chat?nome=" + nome).build();
    await connection.start();
    connection.on("Participantes", (integrantes) => InserirParticipantes(integrantes));
    connection.on("Mensagens", (remetente, message) => AtualizarChatChat(remetente, usuario, message));
}

function InserirMensagem(remetente, message) {
    $("#mensagens").append(`<hr/><span>Nova mensagem de <b>${remetente}</b></span><br><span>${message}</span>`);
}

function EnviarMensagem() {
    let mensagem = { Destinatario: $("#destinatario").val(), Remetente: usuario, Texto: $("#mensagem").val() };
    if (mensagem.Destinatario && mensagem.Texto) {
        AtualizarChatChat(mensagem.Remetente, mensagem.Destinatario, mensagem.Texto);
        connection.invoke("Enviar", mensagem);
    }
}

async function EntrarNoChat() {
    usuario = prompt("Digite seu nome: ");
    if (usuario) {
        await CreateConnection(usuario);
        $("#entrarChat").remove();
    }
}

function InserirParticipantes(integrantes) {
    if (integrantes.length > 0) {
        let quantidade = 1;
        let listagemUsuarios = `<table class="table mt-3">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col"></th>
                                      </tr>
                                    </thead>
                                    <tbody>`

        let usuarios = integrantes.map(integrante => {
            if (!$(`#${usuario + integrante}`).length && !$(`#${integrante + usuario}`).length){
                return `<tr id="btnCriarChat${usuario}${integrante}">
                <td>${quantidade++}</td>
                <td>${integrante}</td>
                <td><button class="btn btn-dark"
                        onclick="CriarChat('${usuario}', '${integrante}')">
                        Chat
                    </button>
                </td>
            </tr>`
            }
            
        });
        listagemUsuarios += usuarios;
        listagemUsuarios += ` </tbody></table>`;
        $("#participantes").html(listagemUsuarios);
    }
}

function InserirNovoIntegrante(novoUsuario) {
    $("#participantes").append(`<hr/><span>Novo usuário entrou no chat: ${novoUsuario}</span>`);
}

function CriarChat(remetente, destinatario) {
    $(`#btnCriarChat${remetente}${destinatario}`).remove();
    $(`#btnCriarChat${destinatario}${remetente}`).remove();
    let chat = `<div  >
                    <div class="alert alert-secondary" role="alert">
                        ${(destinatario == usuario) ? remetente : destinatario}
                    </div>
                    <div style="max-height: 200px; overflow:auto;" id="${remetente + destinatario}">
                    </div>
                
                </div>`;
    $("#mensagens").append(chat);
}

function AtualizarChatChat(remetente, destinatario, mensagem) {
    if (!$(`#${remetente + destinatario}`).length && !$(`#${destinatario + remetente}`).length) {
        CriarChat(remetente, destinatario);
    }
    $(`#${remetente + destinatario}`).append(`<hr/><span><b>${(remetente == usuario) ? "Você" : remetente}</b></span><br><span>${mensagem}</span>`);
    $(`#${destinatario + remetente}`).append(`<hr/><span><b>${(remetente == usuario) ? "Você" : remetente}</b></span><br><span>${mensagem}</span>`);
}
