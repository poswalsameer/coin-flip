package controller

import (
	"math/rand"

	"github.com/gofiber/fiber/v2"
)

type Request struct {
	Option string `json:"option"`
}

func Result(c *fiber.Ctx) error {
	var request Request

	if parsingError := c.BodyParser(&request); parsingError != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"Message": "Invalid request body",
		})
	}

	// Sanitize and validate input
	if request.Option != "heads" && request.Option != "tails" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"Message": "Option must be either 'heads' or 'tails'",
		})
	}

	// Generate random result (1 = heads, 2 = tails)
	randomResult := rand.Intn(2) + 1
	var result string
	if randomResult == 1 {
		result = "heads"
	} else {
		result = "tails"
	}

	// Compare with user's choice
	isCorrect := request.Option == result

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"result":    result,
		"isCorrect": isCorrect,
	})
}
