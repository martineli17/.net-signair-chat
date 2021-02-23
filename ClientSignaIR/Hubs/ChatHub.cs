using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Primitives;
using System.Linq;
using System.Threading.Tasks;

namespace ClientSignaIR.Hubs
{
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            StringValues nomeUsuario;
            Context.GetHttpContext().Request.Query.TryGetValue("nome", out nomeUsuario);
            HubContext.Add(Context.ConnectionId, nomeUsuario);
            //await Clients.Clients(HubContext.Get().Where(x => x.Key != Context.ConnectionId).Select(x => x.Key).ToList()).SendAsync("NovosUsuarios", nomeUsuario);
            await base.OnConnectedAsync();
            await Clients.All.SendAsync("Participantes", HubContext.Get().Select(x => x.Value));
        }

        public async Task Enviar(Mensagem mensagem)
        {
            //Ao usar o método Client(_connections.GetUserId(chat.destination)) 
            //eu estou enviando a mensagem apenas para o usuário destino, não realizando broadcast
            await Clients.Client(HubContext.Get().FirstOrDefault(x => x.Value == mensagem.Destinatario).Key)
                .SendAsync("Mensagens", mensagem.Remetente, mensagem.Texto);
        }
    }
}
