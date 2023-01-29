interface props {route:string, method?:string, payload?:object}
const RESTAPI = async ({route, method="GET", payload={}}: props) =>{
    if(method && route && method==="GET"){
        try{
            const response = await fetch('/api/'+route)
            const data = await response.json()
            return data
        }catch(e){
            console.log(e)
        }
    }else if(method && route && payload && method==="POST" || method==="PUT" || method==="DELETE" || method==="UPSERT"){
        try{
            const response = await fetch('/api/'+route,{
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

export default RESTAPI 