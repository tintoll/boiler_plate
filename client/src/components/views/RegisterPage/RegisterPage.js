import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_actions'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [CofirmPassword, setCofirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setCofirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    
    event.preventDefault();

    if(Password !== CofirmPassword) {
      return alert('비밀번호와 비밀번호확인이 같지 않습니다.')
    }

    const body = {
      email : Email,      
      password : Password,
      name : Name
    }

    dispatch(registerUser(body))
    .then( response => {
      if(response.payload.success) {
        props.history.push('/login')
      } else {
        alert('Error')
      }
    })
  
  }

  return (
    <div style={{
      display : 'flex', justifyContent : 'center', alignItems : 'center',
      width : '100%', height : '100vh'
    }}>
      <form style={{
        display : 'flex', flexDirection : "column"
      }} onSubmit={onSubmitHandler}> 
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={CofirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button>
          로그인
        </button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
