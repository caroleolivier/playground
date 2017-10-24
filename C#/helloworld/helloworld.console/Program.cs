using helloworld.lib;
using System;

namespace helloworld.console
{
    class Program
    {
        static void Main(string[] args)
        {
            var greeter = new Greeter();
            Console.WriteLine(greeter.Greet());
        }
    }
}
