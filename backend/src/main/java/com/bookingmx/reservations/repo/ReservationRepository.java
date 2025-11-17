package com.bookingmx.reservations.repo;

import com.bookingmx.reservations.model.Reservation;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * In-memory repository for managing Reservation entities.
 * This acts as a simple data storage layer without any real database.
 *
 * Uses ConcurrentHashMap for thread safety and AtomicLong for generating IDs.
 */
public class ReservationRepository {

    /** Thread-safe storage of reservations mapped by their ID */
    private final Map<Long, Reservation> store = new ConcurrentHashMap<>();

    /** Auto-incrementing sequence for reservation IDs */
    private final AtomicLong seq = new AtomicLong(1L);

    /**
     * Returns all reservations stored in the repository.
     */
    public List<Reservation> findAll() {
        return new ArrayList<>(store.values());
    }

    /**
     * Finds a reservation by ID.
     *
     * @param id reservation identifier
     * @return an Optional containing the reservation if found
     */
    public Optional<Reservation> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    /**
     * Saves a reservation to the store.
     * If the reservation does not yet have an ID, a new one is assigned.
     */
    public Reservation save(Reservation r) {
        if (r.getId() == null) r.setId(seq.getAndIncrement());
        store.put(r.getId(), r);
        return r;
    }

    /**
     * Deletes a reservation from the repository.
     *
     * @param id reservation identifier to remove
     */
    public void delete(Long id) {
        store.remove(id);
    }
}
