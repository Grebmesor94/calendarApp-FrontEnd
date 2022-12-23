import { addHours } from "date-fns"
import { useCalendar, useModal } from "../../hooks"
import { onDeleteEvent } from "../../store/calendar/calendarSlice"

export const FabDelete = () => {

  const { startDeleteEvent, hasEventSelected } = useCalendar()

  const handleClick = () => { 
    startDeleteEvent()
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClick}
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt" />
    </button>
  )
}
