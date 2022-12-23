import { addHours } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';
import { useCalendar } from './useCalendar';

const formState ={
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
}

export const useModal = () => { 

  const dispatch = useDispatch()

  const { activeEvent } = useSelector(state => state.calendar)

  const [formValues, setFormValues] = useState(formState)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { isDateModalOpen } = useSelector( state => state.ui ); 

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return  (formValues.title > 0)
      ? ''
      : 'is-invalid';

  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if(activeEvent !== null ) { 
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])
  
  const onDateChange = (e, changing) => { 
    setFormValues({
      ...formValues,
      [changing]: e
    })
  }

  const onInputChange = ({ target }) => { 
    const { name, value } = target; 

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const closeDateModal = () => { 
    dispatch( onCloseDateModal() )
  }

  const openDateModal = () => { 
    dispatch( onOpenDateModal () )
  }

  

  return { 
    formValues,
    titleClass,
    isDateModalOpen,

    //? methods
    onInputChange,
    onDateChange,
    openDateModal,
    closeDateModal,
    setFormSubmitted
  }

}