using System;
using System.Linq;
using System.Collections.Generic;

namespace algo.lib
{
    public class HashTable<TKey, TValue>
    {
        private const int _noOfBuckets = 10;
        private LinkedList<KeyValuePair<TKey,TValue>>[] _buckets;

        public HashTable()
        {
            _buckets = new LinkedList<KeyValuePair<TKey,TValue>>[_noOfBuckets];
        }

        public void Add(TKey key, TValue value)
        {
            if(ReferenceEquals(key, null))
            {
                throw new NullKeyException();
            }

            var bucket = GetBucket(key);
            
            foreach (var pair in bucket)
            {
                if(pair.Key.Equals(key))
                {
                    bucket.Remove(pair);
                    break;
                }
            }
            bucket.AddLast(new KeyValuePair<TKey, TValue>(key, value));
        }

        public void Remove(TKey key)
        {
            if (ReferenceEquals(key, null))
            {
                throw new NullKeyException();
            }

            var bucket = GetBucket(key);
            foreach (var pair in bucket)
            {
                if(pair.Key.Equals(key))
                {
                    bucket.Remove(pair);
                    break;
                }
            }
        }

        public TValue Get(TKey key)
        {
            if (ReferenceEquals(key, null))
            {
                throw new NullKeyException();
            }

            var bucket = GetBucket(key);

            foreach (var pair in bucket)
            {
                if(pair.Key.Equals(key))
                {
                    return pair.Value;
                }
            }

            throw new UnknownKeyException(key.ToString());
        }

        private LinkedList<KeyValuePair<TKey, TValue>> GetBucket(TKey key)
        {
            int bucketNo = GetBucketNo(key);
            return GetBucketAt(bucketNo);
        }

        private int GetBucketNo(TKey key)
        {
            int hash = Math.Abs(key.GetHashCode());
            int modulo = hash % _noOfBuckets;
            return modulo;
        }

        private LinkedList<KeyValuePair<TKey,TValue>> GetBucketAt(int bucketNo)
        {
            if(_buckets[bucketNo] == null)
            {
                _buckets[bucketNo] = new LinkedList<KeyValuePair<TKey, TValue>>();
            }
            return _buckets[bucketNo];
        }

        public void Remove(string key)
        {
            throw new NotImplementedException();
        }
    }
}
