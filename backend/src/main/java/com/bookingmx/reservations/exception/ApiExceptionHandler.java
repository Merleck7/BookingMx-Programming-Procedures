package com.bookingmx.reservations.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

/**
 * Global exception handler for the reservations API.
 * Captures specific custom exceptions and returns structured JSON error responses.
 *
 * <p>This improves error consistency and avoids returning raw stack traces to clients.</p>
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Handles business rule violations (invalid input).
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> badRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody(ex.getMessage(), 400));
    }

    /**
     * Handles attempts to access non-existing reservations.
     */
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> notFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody(ex.getMessage(), 404));
    }

    /**
     * Generic fallback for unexpected errors.
     * Prevents leaking server internals to the frontend.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> generic(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorBody("Unexpected error", 500));
    }

    /**
     * Helper method to build a simple and informative error structure.
     */
    private Map<String, Object> errorBody(String message, int status) {
        return Map.of(
                "timestamp", Instant.now().toString(),
                "status", status,
                "message", message
        );
    }
}
