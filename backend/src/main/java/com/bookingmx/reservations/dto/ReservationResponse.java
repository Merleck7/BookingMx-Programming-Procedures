package com.bookingmx.reservations.dto;

import com.bookingmx.reservations.model.ReservationStatus;
import java.time.LocalDate;

/**
 * DTO used to send reservation data to the frontend.
 * Ensures separation between internal domain models and API output.
 */
public class ReservationResponse {

    private Long id;
    private String guestName;
    private String hotelName;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private ReservationStatus status;

    /**
     * Creates a new response DTO with all relevant reservation info.
     *
     * @param id reservation identifier
     * @param guestName name of the guest
     * @param hotelName name of the selected hotel
     * @param checkIn start date of the reservation
     * @param checkOut end date of the reservation
     * @param status current status (ACTIVE/CANCELLED)
     */
    public ReservationResponse(Long id, String guestName, String hotelName,
                               LocalDate checkIn, LocalDate checkOut, ReservationStatus status) {

        this.id = id;
        this.guestName = guestName;
        this.hotelName = hotelName;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getGuestName() { return guestName; }
    public String getHotelName() { return hotelName; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public ReservationStatus getStatus() { return status; }
}
