import { addHours } from "date-fns"
import { useDispatch } from "react-redux"
import { useCalendar, useModal } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useModal()
  const { setActiveEvent } = useCalendar()
  const handleClick = () => { 
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: '#fafafa',
      user: { 
        _id: '123',
        name: 'Fernando'
      }
    });

    openDateModal()
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClick}
    >
      <i className="fas fa-plus" />
    </button>
  )
}
