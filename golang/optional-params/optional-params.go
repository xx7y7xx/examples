// https://stackoverflow.com/a/19813113/4685522
// disadvantage: the params must be the same type

package main

import "fmt"

func foo(params ...int) {
	fmt.Println(len(params))
}

func main() {
	foo()
	foo(1)
	foo(1, 2, 3)
}