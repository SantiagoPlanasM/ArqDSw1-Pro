package middlewareController

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	UserCliente "go-pro/clients/user"
	"go-pro/utils/errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func IsAdmin(c *gin.Context) {
	// Get the user id(int) from the request
	userId := c.GetInt("Id")

	// Get the user from the database
	user := UserCliente.GetUserById(userId)

	/*// Get the user email from the request
	email := c.GetHeader("email")

	// Get the user from the database
	user := UserCliente.GetUserByEmail(email)
	*/
	// Check if the user is admin
	if user.Email != "admin@gmail.com" {
		c.AbortWithStatusJSON(403, errors.NewForbiddenApiError("You are not admin"))
		return
	}

	// If the user is admin, continue with the request
	c.Next()
}

var jwtKey = []byte("secret_key")

func Validate(c *gin.Context) {
	// get cookie
	tokenString, err := c.Cookie("authorizarion")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return jwtKey, nil
	})
	if err != nil || token == nil || !token.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Print(claims["exp"])
		//check expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		c.JSON(http.StatusOK, gin.H{"message": "im logged in"})
		c.Next()
	}
}


