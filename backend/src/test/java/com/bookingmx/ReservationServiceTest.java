package com.bookingmx;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import com.bookingmx.reservations.model.Reservation;
import com.bookingmx.reservations.model.ReservationStatus;

public class ReservationServiceTest {

    private ReservationService service;

    @BeforeEach
    void setUp() {
        service = new ReservationService();
    }

    @Test
    void testCreateReservationSuccessfully() {
        Reservation r = service.createReservation(
                "Luis Mendoza", "Hotel MX",
                LocalDate.of(2025, 11, 15),
                LocalDate.of(2025, 11, 20)
        );

        assertNotNull(r);
        assertEquals("Luis Mendoza", r.getGuestName());
        assertEquals(1, service.getTotalReservations());
    }

    @Test
    void testCreateReservationWithNullDataThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> {
            service.createReservation(null, "Hotel MX", LocalDate.now(), LocalDate.now());
        });
    }

    @Test
    void testCancelReservationSuccessfully() {
        Reservation r = service.createReservation("Ana López", "Hotel Sun", LocalDate.now(), LocalDate.now().plusDays(2));
        boolean result = service.cancelReservation(r.getId());
        assertTrue(result);
        assertEquals(0, service.getTotalReservations());
    }

    @Test
    void testFindByGuestName() {
        service.createReservation("Carlos Pérez", "Hotel Sky", LocalDate.now(), LocalDate.now().plusDays(1));
        Reservation found = service.findByGuestName("Carlos Pérez");
        assertNotNull(found);
        assertEquals("Hotel Sky", found.getHotelName());
    }

    @Test
    void testUpdateStatusToCANCELED() {
        Reservation r = service.createReservation("Martha", "Hotel City", LocalDate.now(), LocalDate.now().plusDays(3));
        boolean updated = service.updateStatus(r.getId(), ReservationStatus.CANCELED);
        assertTrue(updated);
        assertEquals(ReservationStatus.CANCELED, r.getStatus());
    }
}
