import { useEffect, ChangeEvent, useState } from "react"
import RESTAPI from "../../utils/rest"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"
import GpsFixedIcon from "@mui/icons-material/GpsFixed"
import {
	isValidCEP,
	isValidCNPJ,
	isValidPassword
} from "../../utils/verifyString"
import { ConfirmButton } from "../button/MainButtons"
import FormMap from "../Maps/FormMap"
const cnnpj = "00.000.000/0001-00"
export interface formValuesType {
	factoryName: string
	CNPJ: string
	emailUser: string
	address: {
		bairro: string
		cep: string
		complemento: string
		numero: number | undefined
		ddd: string
		localidade: string
		logradouro: string
		uf: string
	}
}
export interface coordType {
	lat: number
	lng: number
}

const CadastroFormEmpresa = () => {
	const nullValues = {
		factoryName: "",
		CNPJ: "",
		emailUser: "",
		address: {
			bairro: "",
			cep: "",
			complemento: "",
			numero: undefined,
			ddd: "",
			localidade: "",
			logradouro: "",
			uf: ""
		}
	}
	const [formValues, setFormValues] = useState<formValuesType>(nullValues)
	const [onloading, setOnloading] = useState<boolean>(false)
	const [formState, setFormState] = useState<number>(1)
	const [changed, setChanged] = useState<boolean>(false)
	const [cepChanged, setCepChanged] = useState<boolean>(true)
	const [filledIn, setFilledIn] = useState<boolean>(false)
	const [coordinates, setCoordinates] = useState<coordType>({
		lat: -23.550437,
		lng: -46.633951
	})
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChanged(true)
		let { name, value } = e.target
		if (
			name === "address.cep" &&
			value.length === 5 &&
			formValues.address.cep.length === 4
		) {
			value = value + "-"
		}
		if (name === "address.cep") {
			setCepChanged(true)
		}
		const key = name.split(".")
		if (key.length === 1) {
			setFormValues({ ...formValues, [name]: value })
		} else if (key[0] in formValues) {
			setFormValues({
				...formValues,
				[key[0]]: {
					...formValues.address,
					[key[1]]: value
				}
			})
		}
	}
	const handleFindCEP = async () => {
		if (
			formValues.factoryName != "" &&
			isValidCNPJ(formValues.CNPJ) &&
			isValidCEP(formValues.address.cep)
		) {
			let CEP: string = formValues.address.cep
			if (isValidCEP(CEP)) {
				CEP = CEP.replace("-", "")
				console.log(CEP)
				try {
					const response = await fetch(
						`https://viacep.com.br/ws/${CEP}/json/`
					)
					const data = await response.json()
					setFormValues({
						...formValues,
						address: {
							...formValues.address,
							bairro: data.bairro,
							ddd: data.ddd,
							localidade: data.localidade,
							logradouro: data.logradouro,
							uf: data.uf
						}
					})
					setFormState(2)
					setCepChanged(false)
				} catch (error) {
					alert("Não foi possível localizar este CEP")
					console.error(error)
					return {}
				}
			} else {
				alert("Não foi possível localizar este CEP")
			}
		} else {
			alert("Preencha os campos corretamente")
		}
	}
	const handleUpdateMap = async () => {
		if (
			formValues.address.logradouro === "" ||
			formValues.address.numero === undefined ||
			formValues.address.localidade === "" ||
			formValues.address.uf === ""
		) {
			alert("Preencha os campos corretamente")
			return
		}
		const address =
			formValues.address.logradouro +
			", " +
			formValues.address.numero +
			" - " +
			formValues.address.localidade +
			", " +
			formValues.address.uf
		console.log(address)

		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				address
			)}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
		)
		const data = await response.json()
		setFormState(3)
		setChanged(false)
		setCoordinates(data.results[0].geometry.location)
	}
	const handleSubmit = async () => {
		setOnloading(true)
		const { factoryName, CNPJ, emailUser, address } = formValues
		const payload = {
			factoryName,
			CNPJ,
			emailUser,
			address
		}
		const prep = {
			route: "user/newUser",
			method: "POST",
			payload
		}
		console.log(formValues)
		setOnloading(false)
	}
	useEffect(() => {
		if (
			formValues.factoryName != "" &&
			isValidCNPJ(formValues.CNPJ) &&
			formValues.address.bairro != "" &&
			isValidCEP(formValues.address.cep) &&
			formValues.address.numero != undefined &&
			formValues.address.ddd != "" &&
			formValues.address.localidade != "" &&
			formValues.address.logradouro != "" &&
			formValues.address.uf != ""
		) {
			setFilledIn(true)
		}
	}, [formValues])
	return (
		<div className='flex justify-center sm:mt-8'>
			<div
				className={
					"sm:mt-0 w-screen grid grid-rows-2 sm:grid-cols-2 relative max-w-6xl"
				}
			>
				<div className='overflow-hidden flex-1 rounded-t-xl sm:rounded-l-xl shadow-lg relative'>
					<div className='mt-5 md:col-span-2 md:mt-0" flex justify-center relative'>
						<label className='block text-lg font-medium text-gray-700'>
							Cadastre sua Empresa!
						</label>
					</div>
					<div className='bg-white px-4 py-5 sm:p-6'>
						<div className='grid grid-cols-6 gap-6'>
							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='factoryName'
									className='block text-sm font-medium text-gray-700'
								>
									Nome da Empresa*
								</label>
								<input
									type='text'
									name='factoryName'
									id='factoryName'
									value={formValues.factoryName}
									autoComplete='given-name'
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:{border-indigo-500 }focus:ring-indigo-500 sm:text-sm focus:outline-none'
									onChange={handleChange}
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label
									htmlFor='CNPJ'
									className='block text-sm font-medium text-gray-700'
								>
									CNPJ*
								</label>
								<input
									type='text'
									name='CNPJ'
									id='CNPJ'
									value={formValues.CNPJ}
									autoComplete='family-name'
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'
									onChange={handleChange}
								/>
							</div>

							<div className='col-span-6 sm:col-span-2'>
								<label
									htmlFor='CEP'
									className='block text-sm font-medium text-gray-700'
								>
									CEP*
								</label>
								<input
									type='text'
									name='address.cep'
									id='cep'
									value={formValues.address.cep}
									autoComplete='cep'
									className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'
									onChange={handleChange}
								/>
							</div>
							{cepChanged && (
								<div className='col-span-6 sm:col-span-2'>
									<button
										onClick={handleFindCEP}
										className='flex flex-col col-span-2 items-center justify-center rounded-md border border-transparent bg-green-main py-1 px-1 text-sm font-small text-white shadow-sm hover:bg-green-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										<label>
											{formState === 1
												? "Preencher Endereço"
												: "Atualizar Endereço"}
										</label>
									</button>
								</div>
							)}

							{formState >= 2 && (
								<>
									<div className='col-span-6 sm:col-span-6'>
										<label
											htmlFor='logradouro'
											className='block text-sm font-medium text-gray-700'
										>
											Endereço
										</label>
										<label className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'>
											{formValues.address.logradouro}
										</label>
									</div>
									<div className='col-span-6 sm:col-span-4 lg:col-span-4'>
										<label
											htmlFor='city'
											className='block text-sm font-medium text-gray-700'
										>
											Cidade
										</label>
										<label className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'>
											{formValues.address.localidade}
										</label>
									</div>

									<div className='col-span-6 sm:col-span-2 lg:col-span-2'>
										<label
											htmlFor='state'
											className='block text-sm font-medium text-gray-700'
										>
											Estado
										</label>
										<label className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'>
											{formValues.address.uf}
										</label>
									</div>

									<div className='col-span-2'>
										<label
											htmlFor='addressNumber'
											className='block text-sm font-medium text-gray-700'
										>
											Número*
										</label>
										<input
											type='text'
											name='address.numero'
											id='address.numero'
											value={formValues.address.numero}
											autoComplete='numero'
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'
											onChange={handleChange}
										/>
									</div>
									<div className='col-span-4'>
										<label
											htmlFor='complemento'
											className='block text-sm font-medium text-gray-700'
										>
											Complemento
										</label>
										<input
											type='text'
											name='complemento'
											id='complemento'
											value={formValues.address.complemento}
											autoComplete='complemento'
											className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none'
											onChange={handleChange}
										/>
									</div>
								</>
							)}
						</div>
					</div>
					<div className='bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-row-reverse justify-between'>
						{formState === 3 && !changed && filledIn && (
							<button
								onClick={handleSubmit}
								className='flex flex-col col-span-2 items-center justify-center rounded-md border border-transparent bg-green-main py-1 px-1 text-sm font-small text-white shadow-sm hover:bg-green-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
								<label>Finalizar!</label>
							</button>
						)}
						{formState >= 2 && (
							<>
								<button
									onClick={handleUpdateMap}
									className='flex flex-col col-span-2 items-center justify-center rounded-md border border-transparent bg-green-main py-1 px-1 text-sm font-small text-white shadow-sm hover:bg-green-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									<label>Atualizar Mapa</label>
								</button>
							</>
						)}
					</div>
				</div>
				<div className='relative rounded-r-xl rounded-b-xl sm:rounded-r-xl overflow-hidden shadow-lg'>
					<FormMap coordinates={coordinates}></FormMap>
				</div>
			</div>
		</div>
	)
}

export default CadastroFormEmpresa
