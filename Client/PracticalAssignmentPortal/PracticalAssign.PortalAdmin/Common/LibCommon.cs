using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PracticalAssign.PortalAdmin.Common
{
    public static class LibCommon
    {
        public static async Task<JToken> GetDataAsync(string Uri, object objs, string Key)
        {
            var client = new RestClient(Uri);
            var request = new RestRequest(Method.GET);
            request.AddHeader("cache-control", "no-cache");
            //request.AddHeader("authorization", "Basic Y2h1bmd0aGFuaHBodW9jOkQ1RTg5MDEwRDU1QzZBMzYzNzRDOEM5RDQ0NUU1NTAz");
            //request.AddHeader("content-type", "application/x-www-form-urlencoded");

            request.AddJsonBody(objs);
            request.RequestFormat = DataFormat.Json;
            var t = client.ExecuteTaskAsync(request);
            t.Wait();
            var restResponse = await t;

            var input = restResponse.Content;
            var json = JObject.Parse(input);
            var data = json[Key];
            return data;
        }
    }
}
