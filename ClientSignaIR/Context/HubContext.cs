using System.Collections.Generic;

public static class HubContext
{
    private static Dictionary<string, string> _contexto = new Dictionary<string, string>();
    public static void Add(string key, string nomeUsuario) => _contexto.Add(key, nomeUsuario);
    public static void Remove(string key) => _contexto.Remove(key);
    public static Dictionary<string, string> Get() => _contexto;
}
