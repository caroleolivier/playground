using System;

namespace algo.lib
{
    public sealed class UnknownKeyException : Exception
    {
        public UnknownKeyException() : base()
        {
        }

        public UnknownKeyException(string message) : base(message)
        {
        }
    }
}
