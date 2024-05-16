package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func (rorr rot13Reader) Read(p []byte) (n int, err error) {
	n, err = rorr.r.Read(p)
	if err != nil {
		return 0, err
	}
	for i, _ := range p {
		if p[i] >= 'A' && p[i] <= 'z' {
			p[i] += 13
			if p[i] > 'z' {
				p[i] -= 26
			}
		}
	}
	return len(p), nil
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
