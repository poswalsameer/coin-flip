package main

import (
	"server/controller"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Create new Fiber instance
	app := fiber.New()

	// Cors
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "https://flippp.vercel.app",
		AllowMethods:     "GET,POST,PUT,DELETE",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	// The single API endpoint we have
	app.Post("/api/result", controller.Result)

	app.Listen(":4200")
}
