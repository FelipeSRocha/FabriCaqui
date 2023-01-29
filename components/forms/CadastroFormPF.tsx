import {MouseEventHandler, ChangeEvent, useState} from 'react'
import RESTAPI from '../../utils/rest';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { isValidCEP, isValidEmail, isValidPassword } from '../../utils/verifyString';
import { ConfirmButton } from '../button/MainButtons';

interface formValuesType {
  firstName:          string, 
  lastName:           string, 
  email:              string,
  address:            string,
  city:               string,
  state:              string,
  CEP:                string,
  firstPass:           string,
  secondPass:           string,
}

const CadastroFormPF = () =>{
    const [formValues, setFormValues] = useState<formValuesType>({
      firstName:            '', 
      lastName:             '', 
      email:                '',
      address:              '',
      city:                 '',
      state:                '',
      CEP:                  '',
      firstPass: "",
      secondPass: "",
    })
    const [pageForm, setPageForm] = useState<Number>(1)
    const [onloading, setOnloading] = useState<boolean>(false)

    const validValues = ()=> {
      const {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        CEP,
      } = formValues
      
      return (
        firstName.length>1 &&
        lastName.length>1 &&
        isValidEmail(email) &&
        isValidCEP(CEP) &&
        address.length>3 &&
        city.length>2 &&
        state.length>1
      )
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    }
    const handleValidateUser = async () =>{
      if (validValues()){
        try{
          const checkUser={
            route:"/user/validateNewUser?email="+formValues.email, 
            method:"GET", 
          }
          const valid = await RESTAPI(checkUser)
          if (valid){
            setPageForm(2)
          }else{
            alert("Email já utilizado")
          }
        }catch(e){
          console.log(e)
        }
      }else{
        alert("Valores inseridos inválidos")
      }

    } 
    const handleSubmit = async () =>{
      console.log(formValues)
      setOnloading(true)
      if(formValues.firstPass!=formValues.secondPass){
        alert("As senhas não coincidem")
        setOnloading(false)

        return
      }

      if(isValidPassword(formValues.firstPass)){
        const {
          firstName, 
          lastName, 
          email,
          address,
          city,
          state,
          CEP,
          firstPass,
        } =formValues
        const payload={
          firstName, 
          lastName, 
          email,
          address,
          city,
          state,
          CEP,
          password:firstPass,
        }
        const prep = {
          route:"user/newUser",
          method:"POST",
          payload,
        }
        try{
          const valid = await RESTAPI(prep)
          alert("Usuário criado com sucesso!")
        }catch(e){
          alert("Erro ao criar usuário")
        }
      }else{
        alert("A senha precisa conter 8 dígitos, 1 caracter numérico e 1 caracter especial")
      }
      setOnloading(false)

    }
    return(
        <div className='flex justify-center mt-16'>
          <div className={"mt-10 sm:mt-0 w-screen flex flex-col absolute " + (pageForm===1?"max-w-3xl":"max-w-sm")}>
              <div className="overflow-hidden shadow sm:rounded-md relative">
                <div className='mt-5 md:col-span-2 md:mt-0" flex justify-center relative'>
                  <label className="block text-lg font-medium text-gray-700">
                    Crie sua Conta!
                  </label>
                </div>
                {pageForm===1?
                <>
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">    
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Primeiro Nome
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formValues.firstName}
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:{border-indigo-500 }focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Último Nome
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formValues.lastName}
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={formValues.email}
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formValues.address}
                        autoComplete="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formValues.city}
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={formValues.state}
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="CEP" className="block text-sm font-medium text-gray-700">
                          CEP
                      </label>
                      <input
                        type="text"
                        name="CEP"
                        id="CEP"
                        value={formValues.CEP}
                        autoComplete="CEP"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={handleValidateUser}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-main py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  > 
                    <label>
                      Próximo

                    </label>
                    <DoubleArrowIcon fontSize="small"/>
                  </button>
                </div>
                </>:
                <>
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="flex flex-col gap-6">    
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="firstPass" className="block text-sm font-medium text-gray-700">
                          Escolha sua Senha
                        </label>
                        <input
                          type="password"
                          name="firstPass"
                          id="firstPass"
                          value={formValues.firstPass}
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:{border-indigo-500 }focus:ring-indigo-500 sm:text-sm focus:outline-none"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="secondPass" className="block text-sm font-medium text-gray-700">
                          Repita a senha
                        </label>
                        <input
                          type="password"
                          name="secondPass"
                          id="secondPass"
                          value={formValues.secondPass}
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3  sm:px-6 flex justify-between">

                    <ConfirmButton label="Voltar" onClick={async ()=>setPageForm(1)} onloading={false}/>

                    <ConfirmButton label="Criar Conta!" onClick={handleSubmit} onloading={onloading}/>
                    
                  </div>
                </>
                }

              </div>
          </div>
        </div>
    )
}

export default CadastroFormPF