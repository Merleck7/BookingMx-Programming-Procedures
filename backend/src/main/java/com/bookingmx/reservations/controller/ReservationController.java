package com.bookingmx.reservations.controller;

import com.bookingmx.reservations.dto.ReservationRequest;
import com.bookingmx.reservations.dto.ReservationResponse;
import com.bookingmx.reservations.model.Reservation;
import com.bookingmx.reservations.service.ReservationService;

import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller that exposes CRUD operations for reservation management.
 * Provides endpoints to list, create, update and cancel reservations.
 *
 * <p>This controller delegates business logic to {@link ReservationService} and
 * uses DTOs to ensure proper separation between internal models and API responses.</p>
 *
 * Endpoints:
 * <ul>
 *     <li>GET /api/reservations - returns a list of existing reservations</li>
 *     <li>POST /api/reservations - creates a new reservation</li>
 *     <li>PUT /api/reservations/{id} - updates an existing reservation</li>
 *     <li>DELETE /api/reservations/{id} - cancels an active reservation</li>
 * </ul>
 *
 * CORS is enabled to allow the frontend (Vite dev server) to access the backend.
 */
@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "*"})
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

    private final ReservationService service;

    /**
     * Creates a new controller with its required service dependency.
     *
     * @param service reservation service (business logic layer)
     */
    public ReservationController(ReservationService service) {
        this.service = service;
    }

    /**
     * Retrieves all reservations in the system.
     *
     * @return list of reservation responses
     */
    @GetMapping
    public List<ReservationResponse> list() {
        return service.list().stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Creates a new reservation based on validated input.
     *
     * @param req reservation details sent from the frontend
     * @return created reservation as a DTO
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ReservationResponse create(@Valid @RequestBody ReservationRequest req) {
        return toResponse(service.create(req));
    }

    /**
     * Updates an existing reservation.
     *
     * @param id  reservation ID to update
     * @param req new reservation data
     * @return updated reservation
     */
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ReservationResponse update(@PathVariable("id") Long id, @Valid @RequestBody ReservationRequest req) {
        return toResponse(service.update(id, req));
    }

    /**
     * Cancels an active reservation.
     *
     * @param id reservation ID
     * @return cancelled reservation
     */
    @DeleteMapping("/{id}")
    public ReservationResponse cancel(@PathVariable("id") Long id) {
        return toResponse(service.cancel(id));
    }

    /**
     * Converts a Reservation model into an API-friendly DTO.
     *
     * @param r internal reservation model
     * @return response DTO
     */
    private ReservationResponse toResponse(Reservation r) {
        return new ReservationResponse(
                r.getId(), r.getGuestName(), r.getHotelName(), r.getCheckIn(), r.getCheckOut(), r.getStatus()
        );
    }
}
