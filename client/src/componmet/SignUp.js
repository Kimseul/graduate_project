import React ,{useState}from "react";

const SignUp = (props) =>{

    const {signUp} = props;
    const [cutomerID, setcutomerID] = useState('');
    const [customerPassword, setcustomerPassword] = useState('');
    const [name, setname] =useState('');

    const handleSignUp =() => {
        const item ={
            cutomerID : cutomerID,
            customerPassword : customerPassword,
            name : name
        }
        signUp(item);
        console.log(item);

    }

    return (
        <div className="signup">
        <form onSubmit={e =>{
            e.preventDefault();
            handleSignUp();
        }}>
          <h1>회원가입</h1>
          <label for="fname">아이디</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={cutomerID}
            onChange={e => setcutomerID(e.target.value)}
          />
  
          <label for="lname">비밀번호</label>
          <input
            type="password"
            id="lname"
            name="lastname"
            placeholder="Your Password.."
            value={customerPassword}
            onChange={e => setcustomerPassword(e.target.value)}
          />
  
          <label for="fname">이름</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={name}
            onChange={e => setname(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
}
export default SignUp