let baseurl="http://localhost:7373/api/";

export const register=async(body)=>{
    const requestoption={
        method:"POST",
        mode:"cors",
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/create`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}


export const login=async(body)=>{
    const requestoption={
        method:"POST",
        mode:"cors",
        headers:{
           "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/login`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}

export const getByid=async(id)=>{
    const requestoption={
        method:"GET",
        mode:"cors",
        header:{
            "content-type":"application/json"
        },
    }
    const response =await fetch (`${baseurl}user/getuser/:${id}`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}


export const getAll=async(body)=>{
    const requestoption={
        method:"GET",
        mode:"cors",
        header:{
            "content-type":"application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/getalluser`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}
export const profile=async()=>{
    let getToken=localStorage.getItem("token")
    const requestoption={
        method:"GET",
        mode:"cors",
        headers:{
            "content-Type":"application/json",
             token:JSON.parse(getToken)
        },
       
    }
    const response =await fetch (`${baseurl}user/profile`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}

export const updateuser=async(body,id)=>{
    const requestoption={
        method:"PUT",
        mode:"cors",
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/update/${id}`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}

export const Deleteuser=async(id)=>{
    const requestoption={
        method:"DELETE",
        mode:"cors",
        headers:{
            "content-Type":"application/json"
        },
    }
    const response =await fetch (`${baseurl}user/delete/${id}`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}