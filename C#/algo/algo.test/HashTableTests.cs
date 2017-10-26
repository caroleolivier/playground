using algo.lib;
using Xunit;

namespace algo.test
{
    public class HashTableTests
    {
        [Fact]
        public void Given_key_and_value_then_value_should_be_added_and_retrieved_successfully_with_the_key()
        {
            var hashTable = new HashTable<string, int>();
            const string key = "theKey";
            int value = 10;

            hashTable.Add(key, value);
            int retrieved = hashTable.Get(key);

            Assert.Equal(value, retrieved);
        }

        [Fact]
        public void Adding_value_with_null_key_should_throw_NullKeyException_exception()
        {
            var hashTable = new HashTable<object, int>();
            object key = null;
            int value = 10;

            Assert.Throws<NullKeyException>(() => hashTable.Add(key, value));
        }

        [Fact]
        public void Trying_to_retrieve_value_with_null_key_should_throw_NullKeyException_exception()
        {
            var hashTable = new HashTable<object, int>();
            object key = null;

            Assert.Throws<NullKeyException>(() => hashTable.Get(key));
        }

        [Fact]
        public void Adding_value_with_same_key_as_existing_one_override_existing_value()
        {
            var hashTable = new HashTable<string, int>();
            const string key = "theKey";
            const int value1 = 1;
            const int value2 = 2;

            hashTable.Add(key, value1);
            Assert.Equal(value1, hashTable.Get(key));
            hashTable.Add(key, value2);
            Assert.Equal(value2, hashTable.Get(key));
        }

        [Fact]
        public void Given_key_for_non_existing_value_then_it_throws_UnknownKeyException_exception()
        {
            var hashTable = new HashTable<string, int>();
            const string key = "theykey";

            Assert.Throws<UnknownKeyException>(() => hashTable.Get(key));
        }

        public void Given_key_for_existing_value_then_value_can_be_removed_by_calling_remove()
        {
            var hashTable = new HashTable<string, int>();
            const string key = "theykey";
            const int value = 10;

            hashTable.Add(key, value);
            Assert.Equal(value, hashTable.Get(key));
            
            hashTable.Remove(key);

            Assert.Throws<UnknownKeyException>(() => hashTable.Get(key));
        }

        public void Trying_to_remove_value_with_null_key_should_throw_NullKeyException_exception()
        {
            var hashTable = new HashTable<object, int>();
            object key = null;

            Assert.Throws<NullKeyException>(() => hashTable.Remove(key));
        }
    }
}
