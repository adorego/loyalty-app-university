export interface HttpProps{
    operation:string;
    url:string;
    data?:{};
}
const httpOperations = async (props:HttpProps) =>{
    let data:any;
    let result:any;
    let error = {status:"", message:""}

    switch(props.operation){
            case 'get':
                result = await fetch(props.url);
                
                if(!result.ok){
                    error = await result.json();
                }else{
                    data = await result.json();
                }
            case 'post':
                
                result = await fetch(props.url,{
                    method:'POST',
                    body:JSON.stringify(props.data),
                    headers:{
                        'Content-Type':'applications/json'
                    }
                });
                
                
                if(!result.ok){
                    error = {status:result.status, message:result.statusText};
                   
                }else{
                    data = await result.json();
                }
        }

        return{
            data,
            error,
            result
        }
}

export default httpOperations;