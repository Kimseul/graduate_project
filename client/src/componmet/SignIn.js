import React ,{ useStatus } from 'react'

const SignIn = (props) => {
    const { signIn} = props;
    const [cutomerID, setCutomerID] = useStatus('');
    const [customerPassword, setCustomerPassword] = useStatus('');

    const handleSignIn = () =>{
        const item ={
            cutomerID : cutomerID,
            customerPassword : customerPassword,
        }
        signIn(item);
        console.log(item); //로그 찍기
    }
    return(
        <div className='signup'>
            <from onSubmit={e =>{
                e.prevenDefault();
                handleSignIn();
            }}>
                <h1>LogIn</h1>
                <label for="fname">ID</label>
                <input type='text' id='fname' name='firstname' placeholder='Your name...' value={cutomerID} onChange={e => setCutomerID(e.target.value)}></input>
                <label for="lname">Password</label>
                <input type='password' id='lname' name='lastname' placeholder='Your password..' value={customerPassword} onChange={e => setCustomerPassword(e.target.value)}/>
                <input type='submit' value="Submit" on/>

            </from>
        </div>
    )

} 
export default SignIn