import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPassword2: '',
};

export const LoginPage = () => {

	const { 
		loginEmail,
		loginPassword,
		onInputChange: loginInputChange 
	} = useForm( loginFormFields )

	const { 
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		onInputChange: registerInputChange
	} = useForm( registerFormFields )

  const { startLogin, errorMessage, startRegister } = useAuthStore() 

	const loginSubmit = e => { 
		e.preventDefault()
		startLogin({ email: loginEmail, password: loginPassword })
	}

	const registerSubmit = e => { 
		e.preventDefault()

    if( registerPassword !== registerPassword2 ) { 
      Swal.fire('Register error', 'Passwords do not match', 'error')
      return;
    }
		startRegister({name: registerName, email: registerEmail, password: registerPassword });
	}

  useEffect(() => {
    if( errorMessage !== undefined ) { 
      Swal.fire( 'Authentication error', errorMessage, 'error')
    }
  }, [errorMessage])
  
	
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={ loginSubmit }>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
								name='loginEmail'
								value={ loginEmail }
								onChange={ loginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
								name="loginPassword"
								value={ loginPassword }
								onChange={ loginInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ registerSubmit }>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
								name="registerName"
								value={ registerName }
								onChange={ registerInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
								name="registerEmail"
								value={ registerEmail }
								onChange={ registerInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
								name="registerPassword"
								value={ registerPassword }
								onChange={ registerInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
								name="registerPassword2"
								value={ registerPassword2 }
								onChange={ registerInputChange }
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
