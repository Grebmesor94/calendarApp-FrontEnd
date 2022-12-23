import { Calendar } from 'react-big-calendar'
import { Navbar, CalendarEvent, CalendarModal} from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useCalendar } from '../../hooks'
import { FabAddNew, FabDelete } from '../'
import { useEffect } from 'react'

export const CalendarPage = () => {

  const {
    events,
    lastView,
    onSelect,
    onViewChanged,
    onDoubleClick,
    eventStyleGetter,
    startLoadingEvents
  } = useCalendar()

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  
  return (
    <div>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew/>
      <FabDelete />
    </div>
  )
}
