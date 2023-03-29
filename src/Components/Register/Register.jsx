import Form from '../Shared/Form';

export default function Register() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="text-4xl font-black text-center text-white mb-5">Register</h1>
        <Form pageType={'register'} />
      </div>
    </div>
  )
}
