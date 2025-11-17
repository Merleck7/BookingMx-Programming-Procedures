package com.bookingmx.reservations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the BookingMx Spring Boot application.
 * Automatically configures beans, scans components, and starts the server.
 */
@SpringBootApplication
public class BookingMxApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingMxApplication.class, args);
    }
}
