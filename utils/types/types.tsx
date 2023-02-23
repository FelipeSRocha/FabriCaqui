export interface factory {
  factoryName: string
  CNPJ: string
  emailUser: string
  address: {
    bairro: string
    cep: string
    complemento: string
    numero: number
    ddd: string
    localidade: string
    logradouro: string
    uf: string
  }
  location: {
    type: string
    coordinates: [number]
  }
  tags: [{ name: string }]
  products: [
    {
      name: string
      productTag: [{ name: string }]
    }
  ]
}
