import React, { useState } from 'react';

const EventFilter = ({ onFilterChange, onGroupChange }) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [groupBy, setGroupBy] = useState('');

    const handleFilterChange = () => {
        onFilterChange({ dateFrom, dateTo });
    };

    const handleGroupChange = (e) => {
        setGroupBy(e.target.value);
        onGroupChange(e.target.value);
    };

    return (
        <div>
            <label>
                Date From:
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </label>
            <label>
                Date To:
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </label>
            <button onClick={handleFilterChange}>Apply Filters</button>

            <label>
                Group By:
                <select value={groupBy} onChange={handleGroupChange}>
                    <option value="">None</option>
                    <option value="userId">User ID</option>
                    <option value="eventType">Event Type</option>
                </select>
            </label>
        </div>
    );
};

export default EventFilter;
