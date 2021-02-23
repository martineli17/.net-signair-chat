using Microsoft.AspNetCore.Mvc;

namespace ClientSignaIR.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
        }

        public IActionResult Index()
        {
            return View();
        }

        //[HttpGet("create-connection-hub/{nome}")] //GET apenas para evitar o AntifogeryToken
        //public async Task<ActionResult> CreateConnection([FromRoute] string nome)
        //{
        //    var connection = new HubConnectionBuilder()
        //                                .WithUrl(new Uri("https://localhost:44398/hub/chat?nome=" + nome))
        //                                .WithAutomaticReconnect()
        //                                .Build();
        //    await connection.StartAsync();
        //    Console.WriteLine("CONEXÃO COM O HUB INICIADA!");
        //    connection.On<List<string>>("Participantes", (integrantes) => 
        //    {
        //        foreach (var integrante in integrantes)
        //            Console.WriteLine($"INTEGRANTE: ${integrante}");
        //    });
        //    connection.On<string, string>("Mensagem", (remetente, message) => 
        //                Console.WriteLine($"NOVA MENSAGEM DE {remetente}: {remetente}"));
        //    return Ok();
        //}
    }
}
