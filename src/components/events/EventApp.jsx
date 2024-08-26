import React, { useState, useEffect } from 'react';
import EventFilter from "./EventFilter.jsx";
import EventTable from "./EventTable.jsx";
import instance from "../../axios.js";

const EventApp = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await instance.get('/events'); // Używanie axios do pobierania eventów
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const filterEvents = (filters) => {
        let filtered = [...events];
        if (filters.dateFrom) {
            filtered = filtered.filter((event) => new Date(event.eventTimestamp) >= new Date(filters.dateFrom));
        }
        if (filters.dateTo) {
            filtered = filtered.filter((event) => new Date(event.eventTimestamp) <= new Date(filters.dateTo));
        }
        setFilteredEvents(filtered);
    };

    const groupEvents = (groupBy) => {
        if (!groupBy) {
            setFilteredEvents(events);
            return;
        }

        const grouped = filteredEvents.reduce((acc, event) => {
            const key = event[groupBy];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(event);
            return acc;
        }, {});

        setFilteredEvents(Object.values(grouped).flat());
    };

    return (
        <div>
            <h1>User Events</h1>
            <EventFilter onFilterChange={filterEvents} onGroupChange={groupEvents} />
            <EventTable events={filteredEvents} />
        </div>
    );
};

export default EventApp;
