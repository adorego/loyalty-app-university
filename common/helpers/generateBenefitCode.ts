import httpOperations, { HttpProps } from "../http/http-operations";

export const getBenefitCode = async (sigla:string, benefitId:string, name:string, lastName:string, cellPhone:string) =>{
        
    
    const dataToSend = {
            sigla:sigla,
            benefitId,
            name,
            lastName,
            cellPhone
    }
    const sendParam:HttpProps = {
            operation:'post',
            url:`/api/v1/university/${sigla}/benefitCode`,
            data:dataToSend
    }
    const {error, data, result} = await httpOperations(sendParam);
    
    return{
        error,
        data,
        result
    }
    
    
};   