'use client'
import { useSearchParams } from 'next/navigation'
import SignUp from '../components/SignUp';


export default function EntryPage(){
    const searchParams = useSearchParams();
    const entry= searchParams.get('entry');

    
    return(
        <>
        {/* correct to signup */}
        {entry === "login" && <SignUp/>}
        </>
    )
}