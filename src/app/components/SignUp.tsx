import { useEffect, useState } from 'react';
import '../../app/globals.css';
import entry from '../login/entry.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//usesrname and password need to be less than 30 characters to be accepted into db
//TODO Fix FIX error where rounddata is undefined when redirecting from signup
export default function SignUp() {
    const [username, setUsername] = useState('');
    const [userNameAvailable, setUserNameAvailable] = useState(true);
    const [email, setEmail] = useState('');
    const [emailCopy, setEmailCopy] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState({
        upper: false,
        lower: false,
        special: false,
        length: false
    });
    const [redirect, setRedirect] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if(redirect) {
            router.push('/');
        }
    });

    useEffect(()=> {
        checkPasswordRequirements();
    }, [password]);

    const checkPasswordRequirements = ():void => {
        const uppercasePasses = /[A-Z]/.test(password);
        const lowercasePasses = /[a-z]/.test(password);
        const specialPasses = /[!@#$%^&*]/.test(password);
        const minPasses = password.length >= 8;

        setPasswordRequirements({
            upper: uppercasePasses,
            lower: lowercasePasses,
            special: specialPasses,
            length: minPasses
        });
    };

    const handleUsernameCheck = async (e: React.FocusEvent<HTMLInputElement>) => {

        //Should return boolean indicating whether or not username is in db, there already taken
        const response = await fetch(`/api/jeopardy/users/${username}`);

        // TODO: handle errors for 500
        if (response.ok) {

            const data: { username: string } = await response.json();


            if (Object.keys(data).length === 0) {
                setUserNameAvailable(true);
                return;
            }

            setUserNameAvailable(false);
        }

    };

    const handleFields = (e: React.ChangeEvent<HTMLInputElement>): void => {
        
        const newValue: string = e.target.value;
        const inputName: string = e.target.name;
        switch (inputName) {
            case 'email':
                setEmail(newValue);
                break;
            case 'confirmEmail':
                setEmailCopy(newValue);
                break;
            case 'username':
                setUsername(newValue);
                break;
            case 'password':
                setPassword(newValue);
                checkPasswordRequirements();
                break;
            default:
                break;
        }
    };

    const readyToSubmit = ():boolean => {
        const passwordRequirementsMet:boolean = Object.values(passwordRequirements).every(value => value);
        if(email === emailCopy && email && username && userNameAvailable && passwordRequirementsMet){
            return false;
        }

        return true;
    };
    //TODO access form data to submit to db
    const handleSignUp =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));
        const response = await fetch('/api/jeopardy/users',{
            method: 'POST',
            body: formDataJson
        });
        const data: {username: string} = await response.json();

        setRedirect(true);
        

    };

    return (
        <form className={entry.signupForm} onSubmit={handleSignUp}>
            <h2> SIGN UP</h2>

            <label htmlFor='email'>Email</label>
            <input id='email' name='email' type='text' onChange={handleFields} value={email} required maxLength={30} />

            <label htmlFor='confirmEmail'>Confirm Email</label>
            <input id='confirmEmail' name='confirmEmail' type='text' onChange={handleFields} value={emailCopy} required maxLength={30} />
            {email != emailCopy && <p className='error'>Emails do not match</p>}

            <label htmlFor='username'>Username</label>
            <input id='username' name='username' type='text' onBlur={handleUsernameCheck} onChange={handleFields} value={username} required maxLength={30} />
            {!userNameAvailable && <p className='error'>Username not available!</p>}

            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='text' onChange={handleFields} value={password} required maxLength={30} />

            <ul>
                <li key='upper' className={passwordRequirements.upper ? 'success' : ''}>Uppercase Letter</li>
                <li key='lower' className={passwordRequirements.lower ? 'success' : ''}>Lowercase Letter</li>
                <li key='special' className={passwordRequirements.special ? 'success' : ''}>Special Character</li>
                <li key='min' className={passwordRequirements.length ? 'success' : ''}>8 characters minimum</li>
            </ul>

            <button className='activeButton' type='submit' disabled={readyToSubmit()}>Sign Up</button>
            <p>Already A User? <Link href={{pathname:'/login', query:{entry: 'login'}}}>Login</Link></p>
        </form>
    );
}