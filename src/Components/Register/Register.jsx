import Form from '../Shared/Form';

export default function Register() {

  return (
    <div className="bg-yellow-300 w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-black">Register</h1>
        <Form pageType={'register'} />
      </div>
    </div>
  )
}
