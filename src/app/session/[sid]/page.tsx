"use client"

import Loading from '@/app/loading'
import UserContext from '@/contexts/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import GiverSession from './giver/page'
import ReceiverSession from './receiver/page'

const Session = ({ params }: { params: { sid: string } }) => {


    const [ role, setRole ] = useState("")

    const [ loading, setLoading ] = useState(false)

    const [ sessionInfo, getSessionInfo ] = useState<any>()

    const { user } = useContext(UserContext);


    const getSession = ()=>{

        setLoading(true)

        // console.log(params?.sid)

        fetch(`${process.env.GOOGLE_SHEETS_URL}?route=getSession&sessionId=${params?.sid}`)
        .then((res) => res.json())
        .then((data) => {
            getSessionInfo(data)
            setLoading(false)
        })
    }


    useEffect(()=>{
        getSession()
    },[])


    useEffect(()=>{
        if(sessionInfo){
            if(sessionInfo.giverUserEmail == user?.email){
                return setRole("giver")
            }
            else if(sessionInfo.receiverUserEmail == user?.email) {
                return setRole("receiver")
            }
        }
    },[sessionInfo])
    
    if(role=="giver") return <GiverSession sessionInfo={sessionInfo}/>
    if(role=="receiver") return <ReceiverSession sessionInfo={sessionInfo}/>

    return <Loading/>

}

export default Session