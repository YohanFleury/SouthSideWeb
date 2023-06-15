import { useState } from 'react'

type ApiResponse = {
    ok: boolean;
    problem: string;
    data: any;
    status: number;
    headers: Object;
    config: Object;
    duration: number;
}

const useApi = (apiFunc: any) => {
    const [data, setData] = useState<any>([])
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const request = async (...args: any) => {
        setError(false)
        setSuccess(false)

        setLoading(true)
        const response: ApiResponse = await apiFunc(...args)
        setLoading(false)
//        response.problem && console.log('Problem : ', response?.status, response.problem, response, apiFunc)
        //console.log(response, apiFunc)
        if (!response?.ok) return setError(true)

        setError(false)
        setSuccess(true)
        setData(response.data)
        //setSuccess(false)
    }
    return { data, error, loading, success, request }
    
}

export default useApi