export interface factory {
  general:{
    factoryName: string
    CNPJ: string
    emailUser: string
    phoneContact: string, 
    description: string ,
    // image: Buffer ,
    emailContact: string, 
  },

  address: {
    bairro: string
    cep: string
    complemento: string
    numero: number
    ddd: string
    localidade: string
    logradouro: string
    uf: string
  },
  location: {
    type: string
    coordinates: [number,number]
  },
  category: string,
  subCategories: [string],
  // products: [
  //   {
  //     name: string
  //     productTag: [{ name: string }]
  //   }
  // ],
}
export interface session {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    [key: string]: string;
  };
}