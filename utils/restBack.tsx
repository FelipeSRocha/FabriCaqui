const RESTAPIBACK = async (route:string, method:string="GET", payload:object={}) =>{
    if(method && route && method==="GET"){
        try{
            const response = await fetch(`${process.env.URL}/api/${route}`)
            const data = await response.json()
            return data
        }catch(e){
            console.log(e)
        }
    }else if(method && route && payload && method==="POST" || method==="PUT" || method==="DELETE" || method==="UPSERT"){
        try{
            const response = await fetch(`${process.env.URL}/api/${route}`,{
                method,
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            return data
        }catch(e){
            console.log(e)
        }
    }else{
        return {error: "REST Inválido"}
    }
}

export default RESTAPIBACK 