package com.bookingmx.reservations.service;

import com.bookingmx.reservations.dto.ReservationRequest;
import com.bookingmx.reservations.model.Reservation;
import com.bookingmx.reservations.model.ReservationStatus;
import com.bookingmx.reservations.repo.ReservationRepository;
import com.bookingmx.reservations.exception.BadRequestException;
import com.bookingmx.reservations.exception.NotFoundException;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Service layer for managing reservation operations.
 * Contains business logic and validation rules.
 */
@Service
public class ReservationService {

    /** Repository instance managing storage of reservations */
    private final ReservationRepository repo = new ReservationRepository();

    /**
     * Returns all reservations in the system.
     */
    public List<Reservation> list() {
        return repo.findAll();
    }

    /**
     * Creates a new reservation after validating request data.
     */
    public Reservation create(ReservationRequest req) {
        validateDates(req.getCheckIn(), req.getCheckOut());
        Reservation r = new Reservation(null, req.getGuestName(), req.getHotelName(), req.getCheckIn(), req.getCheckOut());
        return repo.save(r);
    }

    /**
     * Updates an existing reservation.
     * Only active reservations can be updated.
     */
    public Reservation update(Long id, ReservationRequest req) {
        Reservation existing = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        if (!existing.isActive())
            throw new BadRequestException("Cannot update a canceled reservation");

        validateDates(req.getCheckIn(), req.getCheckOut());

        existing.setGuestName(req.getGuestName());
        existing.setHotelName(req.getHotelName());
        existing.setCheckIn(req.getCheckIn());
        existing.setCheckOut(req.getCheckOut());

        return repo.save(existing);
    }

    /**
     * Cancels an existing reservation by changing its status.
     */
    public Reservation cancel(Long id) {
        Reservation existing = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        existing.setStatus(ReservationStatus.CANCELED);
        return repo.save(existing);
    }

    /**
     * Validates the check-in and check-out dates.
     * Ensures dates are not null, are in the future,
     * and check-out is after check-in.
     */
    private void validateDates(LocalDate in, LocalDate out) {
        if (in == null || out == null)
            throw new BadRequestException("Dates cannot be null");

        if (!out.isAfter(in))
            throw new BadRequestException("Check-out must be after check-in");

        if (in.isBefore(LocalDate.now()))
            throw new BadRequestException("Check-in must be in the future");

        if (out.isBefore(LocalDate.now()))
            throw new BadRequestException("Check-out must be in the future");
    }
}
