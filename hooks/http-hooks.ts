import { useState } from "react";

export interface useHttpProps{
    operation:string;
    url:string;
    data?:{};
}
const useHttp = async (props:useHttpProps) =>{
    const [error, setError] = useState(false);
    const [pending, setPending] = useState(false);
    let data:string = '';
    let result:Response;

    switch(props.operation){
        case 'get':
            setPending(true);
            result = await fetch(props.url);
            setPending(false);
            if(!result.ok){
                setError(true);
            }else{
                data = await result.json();
            }
        case 'post':
            setPending(true);
            result = await fetch(props.url,{
                method:'POST',
                body:JSON.stringify(props.data),
                headers:{
                    'Content-Type':'applications/json'
                }
            });
            setPending(false);
            if(!result.ok){
                setError(true);
            }else{
                data = await result.json();
            }
    }
    

    return{
        error,
        pending,
        data
    }
}

export default useHttp;