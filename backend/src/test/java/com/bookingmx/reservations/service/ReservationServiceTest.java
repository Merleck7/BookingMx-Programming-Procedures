package com.bookingmx;

import com.bookingmx.reservations.dto.ReservationRequest;
import com.bookingmx.reservations.model.Reservation;
import com.bookingmx.reservations.model.ReservationStatus;
import com.bookingmx.reservations.service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

/**
 * Unit tests for the ReservationService class.
 * 
 * These tests validate the core business logic implemented in Sprint 3,
 * including creation, updating, cancellation, and validation rules.
 * 
 * The repository used in ReservationService is in-memory, which makes these
 * tests behave similarly to integration tests without needing mocks.
 */
public class ReservationServiceTest {

    private ReservationService service;

    /**
     * Creates a fresh ReservationService instance before each test.
     * Ensures tests do not interfere with each other.
     */
    @BeforeEach
    void setUp() {
        service = new ReservationService();
    }

    /**
     * Helper method to quickly build a valid ReservationRequest.
     * Dates are automatically set to future values.
     */
    private ReservationRequest buildValidRequest() {
        ReservationRequest req = new ReservationRequest();
        req.setGuestName("Luis Mendoza");
        req.setHotelName("Hotel MX");
        req.setCheckIn(LocalDate.now().plusDays(5));
        req.setCheckOut(LocalDate.now().plusDays(7));
        return req;
    }

    /**
     * Validates that creating a reservation with valid data succeeds.
     */
    @Test
    void testCreateReservationSuccessfully() {
        ReservationRequest req = buildValidRequest();

        Reservation created = service.create(req);

        assertNotNull(created, "Reservation should be created");
        assertEquals("Luis Mendoza", created.getGuestName());
        assertEquals(1, service.list().size(), "There should be exactly one reservation stored");
    }

    /**
     * Ensures that creating a reservation with invalid dates throws a BadRequestException.
     */
    @Test
    void testCreateReservationWithInvalidDatesThrowsException() {
        ReservationRequest req = buildValidRequest();
        req.setCheckOut(req.getCheckIn().minusDays(1)); // invalid: checkout before checkin

        assertThrows(RuntimeException.class, () -> service.create(req),
                "Invalid date ranges must throw an exception");
    }

    /**
     * Validates that updating an existing reservation works properly when the reservation is active.
     */
    @Test
    void testUpdateReservationSuccessfully() {
        ReservationRequest initial = buildValidRequest();
        Reservation saved = service.create(initial);

        ReservationRequest updatedReq = new ReservationRequest();
        updatedReq.setGuestName("Updated Name");
        updatedReq.setHotelName("Updated Hotel");
        updatedReq.setCheckIn(LocalDate.now().plusDays(10));
        updatedReq.setCheckOut(LocalDate.now().plusDays(12));

        Reservation updated = service.update(saved.getId(), updatedReq);

        assertEquals("Updated Name", updated.getGuestName());
        assertEquals("Updated Hotel", updated.getHotelName());
    }

    /**
     * Ensures updating a canceled reservation fails with a BadRequestException.
     */
    @Test
    void testUpdateCanceledReservationThrowsException() {
        ReservationRequest req = buildValidRequest();
        Reservation r = service.create(req);

        service.cancel(r.getId()); // now canceled

        ReservationRequest newReq = buildValidRequest();

        assertThrows(RuntimeException.class, () -> service.update(r.getId(), newReq),
                "Cannot update a canceled reservation");
    }

    /**
     * Validates that canceling a reservation changes its status to CANCELED.
     */
    @Test
    void testCancelReservationSuccessfully() {
        Reservation r = service.create(buildValidRequest());

        Reservation canceled = service.cancel(r.getId());

        assertEquals(ReservationStatus.CANCELED, canceled.getStatus());
    }

    /**
     * Ensures that canceling a non-existing reservation throws a NotFoundException.
     */
    @Test
    void testCancelNonExistingReservationThrowsException() {
        assertThrows(RuntimeException.class, () -> service.cancel(999L),
                "Canceling a non-existing reservation must throw an exception");
    }
}
