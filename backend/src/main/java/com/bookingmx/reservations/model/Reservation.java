package com.bookingmx.reservations.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Domain model representing a hotel reservation.
 * This class contains all the relevant business data, including
 * the status and check-in/check-out dates.
 *
 * <p>This model is used internally by the service layer and is not exposed
 * directly to the API consumer.</p>
 */
public class Reservation {

    /** Unique identifier for the reservation */
    private Long id;

    /** Name of the guest who created the reservation */
    private String guestName;

    /** Hotel where the reservation was made */
    private String hotelName;

    /**
     * Check-in date for the reservation.
     * JsonFormat ensures Spring can correctly parse the date
     * when receiving JSON from the frontend.
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkIn;

    /**
     * Check-out date for the reservation.
     * The same format is required for proper JSON parsing.
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkOut;

    /** Current reservation status (ACTIVE or CANCELLED) */
    private ReservationStatus status = ReservationStatus.ACTIVE;

    /** Default constructor required for JSON deserialization */
    public Reservation() {}

    /**
     * Full constructor used by the service layer.
     */
    public Reservation(Long id, String guestName, String hotelName,
                       LocalDate checkIn, LocalDate checkOut) {

        this.id = id;
        this.guestName = guestName;
        this.hotelName = hotelName;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.status = ReservationStatus.ACTIVE;
    }

    // ----- Getters and Setters -----

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }

    public LocalDate getCheckIn() { return checkIn; }
    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }

    public LocalDate getCheckOut() { return checkOut; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }

    public ReservationStatus getStatus() { return status; }
    public void setStatus(ReservationStatus status) { this.status = status; }

    /**
     * @return true if the reservation is active, false otherwise.
     */
    public boolean isActive() {
        return this.status == ReservationStatus.ACTIVE;
    }

    // ----- Equality based only on the ID -----

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Reservation)) return false;
        Reservation that = (Reservation) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() { return Objects.hash(id); }
}
