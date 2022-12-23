import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"
import { clearErrorMessage, onLogin, onLogout } from "../store/user/userSlice"

export const useAuthStore = () => { 

  const { status, user, errorMessage } = useSelector(state => state.user )
  const dispatch = useDispatch()

  const startLogin = async({ email, password }) => { 
    try {
      
      const { data } = await calendarApi.post( '/users', { email, password } )
      localStorage.setItem( 'token', data.token )
      localStorage.setItem( 'token-init-date', new Date().getTime() )
      dispatch( onLogin( { name: data.user.name, uid: data.user.uid } ) )
      
    } catch (error) {
      dispatch( onLogout( 'Wrong credentials' ) )
      setTimeout(() => {
        dispatch( clearErrorMessage() )
      }, 100);
    }
  }

  const startRegister = async({ name, email, password }) => { 
    try {
      const { data } = await calendarApi.post('/users/new', { name, email, password })
      localStorage.setItem( 'token', data.token )
      localStorage.setItem( 'token-init-date', new Date().getTime() )
      dispatch( onLogin( { name: data.name, uid: data.uid } ) )
    } catch (error) {
      console.log(error);
      dispatch( onLogout( error.response.data?.msg ) )
      setTimeout(() => {
        dispatch( clearErrorMessage() )
      }, 100);
    }
  }

  const checkToken = async() => { 
    const token = localStorage.getItem( 'token' );
    if( !token ) return dispatch( onLogout() )

    try {
      const { data } = await calendarApi.get('/users/renew');
      localStorage.setItem( 'token', data.token )
      localStorage.setItem( 'token-init-date', new Date().getTime() )
      localStorage.setItem('user', data.user)

      dispatch( onLogin( { name: data.user.name, uid: data.user.uid } ) )

    } catch (error) {
      localStorage.clear();
      dispatch( onLogout() );
    }
  }

  const startLogout = () => { 
    localStorage.clear()
    dispatch( onLogout() )
    dispatch( onLogoutCalendar() )
  }



  return { 
    //* properties
    status,
    user,
    errorMessage,
    //* methods
    startLogin,
    startRegister,
    checkToken,
    startLogout
  }
  
}