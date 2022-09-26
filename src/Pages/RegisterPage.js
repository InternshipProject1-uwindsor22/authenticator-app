import { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
// import { Link} from "react-router-dom"

export default function RegisterPage() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
   const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [profilePhotoBytes, setProfilePhotoBytes] = useState([])
  // const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      // await signup(emailRef.current.value, passwordRef.current.value)
      // history.push("/")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

    function getProfilePhotoBytes(e) {
      const file = e.target.files[0];
      const fReader = new FileReader();
      const fileBytes = [];
      fReader.readAsArrayBuffer(file);
      fReader.onloadend = (et) => {
      if (et.target.readyState === FileReader.DONE) {
        const buf = et.target.result,
          arr = new Uint8Array(buf);
        for (const a of arr) {
          fileBytes.push(a);
        }
        setProfilePhotoBytes(fileBytes)
      }
    }
  }
//console.log(profilePhotoBytes)

    return (
      <>
        <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required className="email--input"/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <br/>
            <div align = "center">
            <input type="file" accept="image/png, image/jpeg" onChange={getProfilePhotoBytes}/>
            </div>
            <br/>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
      </Card>
      
    </>
    );
  }



















      {/* <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={handleSubmit}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email" ref={emailRef} />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" ref={passwordRef} />
				</div>
        <div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Confirm Password" ref={passwordConfirmRef}/>
				</div>
				<button className="button login__submit">
					<span className="button__text">Register Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div> */}