import Form from '../Shared/Form';

export default function Login() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl text-center font-black text-white">Login</h1>
        <Form pageType={'login'} />
      </div>
    </div>
  )
}
