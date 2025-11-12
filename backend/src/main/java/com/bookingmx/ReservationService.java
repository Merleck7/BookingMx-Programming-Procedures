package com.bookingmx;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDate;
import com.bookingmx.reservations.model.Reservation;
import com.bookingmx.reservations.model.ReservationStatus;

public class ReservationService {

    private final List<Reservation> reservations = new ArrayList<>();
    private Long nextId = 1L;

    // ✅ Crear una reserva
    public Reservation createReservation(String guestName, String hotelName, LocalDate checkIn, LocalDate checkOut) {
        if (guestName == null || hotelName == null || checkIn == null || checkOut == null) {
            throw new IllegalArgumentException("Invalid reservation data");
        }

        Reservation r = new Reservation(nextId++, guestName, hotelName, checkIn, checkOut);
        reservations.add(r);
        return r;
    }

    // ✅ Cancelar una reserva
    public boolean cancelReservation(Long id) {
        return reservations.removeIf(r -> r.getId().equals(id));
    }

    // ✅ Obtener el total de reservas activas
    public int getTotalReservations() {
        return reservations.size();
    }

    // ✅ Buscar una reserva por nombre de huésped
    public Reservation findByGuestName(String guestName) {
        return reservations.stream()
                .filter(r -> r.getGuestName().equalsIgnoreCase(guestName))
                .findFirst()
                .orElse(null);
    }

    // ✅ Cambiar estado de una reserva a CANCELADA
    public boolean updateStatus(Long id, ReservationStatus newStatus) {
        for (Reservation r : reservations) {
            if (r.getId().equals(id)) {
                r.setStatus(newStatus);
                return true;
            }
        }
        return false;
    }
}
