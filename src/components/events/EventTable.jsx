import React, {useEffect} from 'react';

const EventTable = ({ events }) => {
    useEffect(() => {
        if (events && events.length > 0) {
            console.log('Original timestamp:', events[0].eventTimestamp);
            console.log('Parsed date object:', new Date(events[0].eventTimestamp));
        }

    }, [events]);

    return (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600">
            <tr>
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Event Type</th>
                <th className="py-2 px-4 border-b">Timestamp</th>
                <th className="py-2 px-4 border-b">Details</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{event.userId}</td>
                    <td className="py-2 px-4 border-b">{event.eventType}</td>
                    <td className="py-2 px-4 border-b">
                        {new Date(event.eventTimestamp).toLocaleString('en-GB', {
                            timeZone: 'Europe/Warsaw',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        })}
                    </td>
                    <td className="py-2 px-4 border-b">{event.details || 'N/A'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EventTable;
