import '../../app/globals.css';
import entry from '../login/entry.module.css';
//usesrname and password need to be less than 30 characters to be accepted into db
//TODO add front end checks showing requireents for input fields
export default function SignUp() {



    return(
        <form className={entry.signupForm}>
            <h2> SIGN UP</h2>
            
            <label htmlFor='email'>Email</label>
            <input id='email' name='email'/>
            
            <label htmlFor='confirmEmail'>Confirm Email</label>
            <input id='confirmEmail' name='confirmEmail'/>
           
            <label htmlFor='username'>Username</label>
            <input id='username' name='username'/>

            <label htmlFor='password'>Password</label>
            <input id='password' name='password'/>

            <ul>
                <li key='upper'>Uppercase Letter</li>
                <li key='lower'>Lowercase Letter</li>
                <li key='special'>Special Character</li>
                <li key='min'>8 characters minimum</li>
            </ul>
            
            <button className='activeButton'>Sign Up</button>
            <p>Already a User? <u>LOGIN</u></p>
        </form>
    )
}