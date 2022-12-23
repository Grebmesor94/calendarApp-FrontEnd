import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/esm/locale/es';

import { useCalendar, useModal } from '../../hooks';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
registerLocale('es', es)

 

export const CalendarModal = () => {

  const { 
    formValues,
    onInputChange,
    onDateChange,
    titleClass,
    isDateModalOpen,
    closeDateModal,
    setFormSubmitted
  } = useModal() 

  const { startSavingEvent } = useCalendar()

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if( isNaN(difference) || difference <= 0 ) { 
      Swal('Fechas incorrectas', 'Revise las fechas introducidas', 'error')
      return;
    } 
    if( formValues.title.length <= 0) return; 

    await startSavingEvent(formValues)
    closeDateModal()
    setFormSubmitted(false)

  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ closeDateModal }
      style={ customStyles }
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={ 200 }
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>

        <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker 
              showTimeSelect
              selected={ formValues.start }
              onChange={ (e) => onDateChange(e, 'start') }
              dateFormat='Pp'
              locale='es'
              timeCaption='Hora'
              className='form-control'
            />
        </div>

        <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker 
              showTimeSelect
              minDate={ formValues.start }
              selected={ formValues.end }
              onChange={ (e) => onDateChange(e, 'end') }
              dateFormat='Pp'
              locale='es'
              timeCaption='Hora'
              className='form-control'
            />
        </div>

        <hr />
        <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input 
                type="text" 
                className={`form-control ${ titleClass }`}
                placeholder="Título del evento"
                name="title"
                value={ formValues.title }
                onChange={onInputChange}
                autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
            <textarea 
                type="text" 
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"
                value={ formValues.notes }
                onChange={onInputChange}
                autoComplete="off"
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
