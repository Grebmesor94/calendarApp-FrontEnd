import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { convertEventDate } from "../helpers"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import { useModal } from "./useModal"

export const useCalendar = () => {

  const dispatch = useDispatch()

  const { openDateModal } = useModal()

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week' )

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.user)
  
  const eventStyleGetter = ( event, start, end, isSelected ) => { 

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )
    
    const style = { 
      backgroundColor: isMyEvent ? '#347cf7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  const setActiveEvent = ( CalendarEvent ) => { 
    dispatch( onSetActiveEvent( CalendarEvent ) ) 
  }

  const startSavingEvent = async ( calendarEvent ) => { 

    calendarEvent.user = user;
    try {

      if( calendarEvent.id) { 
        //actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent)
        dispatch( onUpdateEvent({ ...calendarEvent  }) )
        return;
      }
        //creando
        const { data } = await calendarApi.post( '/events', calendarEvent )   
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id }) )

    } catch (error) {
      console.log(error)
      Swal.fire('Error at saving', error?.response?.data.msg, 'error')
    }

    
  }

  const startDeleteEvent = async() => {
    
    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`)
      dispatch( onDeleteEvent() )
    } catch (error) {
      console.log(error);
      Swal.fire('Error at deleting', error?.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async() => { 
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventDate( data.events )
      dispatch( onLoadEvents( events ) )

    } catch (error) {
      console.log(error);
    }
  }

  const onDoubleClick = (e) => { 
    console.log({ doubleClick: e })
    openDateModal()
  }

  const onSelect = (e) => { 
    setActiveEvent( e )
  }

  const onViewChanged = (e) => { 
    localStorage.setItem('lastView', e)
  }

  return { 
    //? props
    events,
    activeEvent,
    lastView,
    hasEventSelected: !!activeEvent,
    
    //? methods
    eventStyleGetter,
    onDoubleClick,
    onSelect,
    onViewChanged,
    setActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
  }
  
}
