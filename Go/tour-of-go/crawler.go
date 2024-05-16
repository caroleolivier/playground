package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type CrawlerCache struct {
	mu sync.Mutex
	visitedUrls  map[string]int
}

func (c *CrawlerCache) Add(url string) {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mu.Unlock()
	c.visitedUrls[url] = 1
}

func (c *CrawlerCache) IsVisited(url string) bool {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mu.Unlock()
	_, ok := c.visitedUrls[url]
	return ok
}

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(cache *CrawlerCache, urlChan chan string, url string, depth int, fetcher Fetcher) {
	fmt.Println("debug: visiting %v", url)

	if cache.IsVisited(url) {
		fmt.Println("Already visited %v", url)
		return
	} else {
		cache.Add(url)
		urlChan <- url
	}
	// TODO: Fetch URLs in parallel.
	// TODO: Don't fetch the same URL twice.
	// This implementation doesn't do either:
	if depth <= 0 {
		return
	}
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\n", url, body)
	for _, u := range urls {
		fmt.Println("going %v", u)
		go Crawl(cache, urlChan, u, depth-1, fetcher)
	}
	return
}

func main() {
	cache := CrawlerCache{visitedUrls: make(map[string]int)}
	visitedChan := make(chan string)
	Crawl(&cache, visitedChan, "https://golang.org/", 4, fetcher)
	
	for i := 0; i < 10; i++ {
		url, ok := <-visitedChan
		if !ok {
			break;
		}
		fmt.Println("CHANNEL VISITING %v", url)
	}
}

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
