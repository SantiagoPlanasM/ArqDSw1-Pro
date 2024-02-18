package app

import (
	log "github.com/sirupsen/logrus"
	bookingController "go-pro/controllers/booking"
	hotelController "go-pro/controllers/hotel"
	middleware "go-pro/controllers/middleware"
	userController "go-pro/controllers/user"
)

func mapUrls() {

	log.Info("Starting mappings configurations")

	// Users Mapping
	router.GET("/user/:id", userController.GetUserById)

	// Only for Admin
	router.GET("/user", middleware.Validate, userController.GetUsers)

	router.POST("/user", userController.UserInsert)
	router.POST("/user/login", userController.LoginUser)

	// Hotels Mapping
	router.GET("/hotel/id/:id", hotelController.GetHotelById)
	router.GET("/hotel", hotelController.GetHotels)

	// Only for Admin
	router.POST("/hotel", middleware.Validate, hotelController.HotelInsert)

	// Images Mapping
	router.GET("/hotel/:hotelId/images", hotelController.GetHotelImagesById)
	router.GET("/hotel/images", hotelController.GetHotelImages)
	router.POST("/hotel/:hotelId/image", middleware.Validate, hotelController.AddHotelImage)

	// Bookings Mapping

	// Only for Admin
	router.GET("/booking/id/:id", middleware.Validate, bookingController.GetBookingById)

	// Only for Admin
	router.GET("/booking", middleware.Validate, bookingController.GetBookings)

	router.GET("/booking/user/:userId", middleware.Validate, bookingController.GetBookingsByUserId)
	router.POST("/booking", middleware.Validate, bookingController.CreateBooking)

	router.GET("/validate", middleware.Validate)

	log.Info("Finishing mappings configurations")
}
