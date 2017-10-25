using System;
namespace algo.lib
{
    public class NullKeyException : Exception
    {
        public NullKeyException() : base()
        {
        }

        public NullKeyException(string message) : base(message)
        {
        }
    }
}
