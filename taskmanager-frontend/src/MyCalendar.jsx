import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" 
import './App.css'

function MyCalendar({ setSelectedDate}) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const currentDateStr = new Date().toISOString().split('T')[0];
    const [highlightedDate, setHighlightedDate] = useState(currentDateStr);

    const highlightElement = (dateStr) => {
        const highlightedElement = document.querySelector(`[data-date="${dateStr}"]`);
        if (highlightedElement) {
            highlightedElement.classList.add('custom-highlight');
        };
    };

    const removeHighlight = () => {
        if (highlightedDate) {
            const previousHighlightedElement = document.querySelector(`[data-date="${highlightedDate}"]`);
            if (previousHighlightedElement) {
                previousHighlightedElement.classList.remove('custom-highlight');
            };
        };
    };

    useEffect(() => {
        // highlight today's date
        // highlight the selected date
        highlightElement(highlightedDate);
    }, [currentMonth]);

    const handleDateClick = (info) => {
        // highlighted date here is the current date

        // remove highlight of previous date
        removeHighlight();

        // highlight the selected date
        highlightElement(info.dateStr);

        setSelectedDate(info.date);
        setHighlightedDate(info.dateStr);
        // highlighted date here is the clicked date
    };

    return (
        <div className='calendar'>
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            height='100%'
            dateClick={(info) => handleDateClick(info)}
            // for every change of month, re-render the highlight of selected date
            datesSet={(info) => setCurrentMonth(info.start)}
            />
        </div>
    );
}

export default MyCalendar;