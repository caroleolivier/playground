using algo.lib;
using System;
using Xunit;

namespace algo.test
{
    public class HashTableTests
    {
        [Fact]
        public void Given_key_and_value_Then_it_should_be_added_and_retrieved_successfully()
        {
            var hashTable = new HashTable<string, int>();
            string key = "theKey";
            int value = 10;

            hashTable.Add(key, value);
            int retrieved = hashTable.Get(key);

            Assert.Equal(value, retrieved);
        }

        [Fact]
        public void Adding_object_with_null_key_should_throw_NullKeyException_exception()
        {
            var hashTable = new HashTable<object, int>();
            object key = null;
            int value = 10;

            Assert.Throws<NullKeyException>(() => hashTable.Add(key, value));
        }

        [Fact]
        public void Trying_to_retrieve_object_with_null_key_should_throw_NullKeyException_exception()
        {
            var hashTable = new HashTable<object, int>();
            object key = null;

            Assert.Throws<NullKeyException>(() => hashTable.Get(key));
        }
    }
}
