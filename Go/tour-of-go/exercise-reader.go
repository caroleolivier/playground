package main

import "golang.org/x/tour/reader"

type MyReader struct{}

// TODO: Add a Read([]byte) (int, error) method to MyReader.

func (r MyReader) Read(input []byte) (int, error) {
	for i, _ := range input {
		input[i] = 'A'
	}
	return len(input), nil
}

func main() {
	reader.Validate(MyReader{})
}
