package main

import "fmt"

// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {
	fib1 := -1
	fib2 := -1
	fibsum := -1
	return func() int {
		if fib1 == -1 {
			fib1 = 0
			return 0
		}
		if fib2 == -1 {
			fib2 = 1
			return 1
		}
		fibsum = fib1 + fib2
		fib1 = fib2
		fib2 = fibsum
		return fibsum
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
