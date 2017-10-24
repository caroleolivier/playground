using helloworld.lib;
using System;
using Xunit;

namespace helloworld.lib.tests
{
    public class GreeterTests
    {
        [Fact]
        public void Call_to_greet_should_return_HelloWorld()
        {
            var greeter = new Greeter();
            string message = greeter.Greet();
            Assert.Equal(message, "Hello World");
        }
    }
}
