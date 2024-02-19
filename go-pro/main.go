package main

import (
	"go-pro/app"
	"go-pro/db"
)

func main() {
	db.StartDbEngine()
	app.StartRoute()
}
