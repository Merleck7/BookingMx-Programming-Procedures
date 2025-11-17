package com.bookingmx.reservations.model;

/**
 * Enum representing the possible statuses of a reservation.
 * This allows the system to track the life cycle of a booking.
 */
public enum ReservationStatus {
    PENDING,      // Reservation has been created but is not yet confirmed
    ACTIVE,       // Reservation is active and valid
    COMPLETED,    // Reservation has been completed (check-out finished)
    CANCELED      // Reservation has been canceled by user or system
}
