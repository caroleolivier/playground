package main

import (
	"fmt"
	"strings"

	"golang.org/x/tour/wc"
)

func WordCount(s string) map[string]int {
	words := strings.Fields(s)
	fmt.Println(words)

	counters := make(map[string]int)
	for _, word := range words {
		counters[word] = counters[word] + 1
	}

	return counters
}

func main() {
	wc.Test(WordCount)
}
