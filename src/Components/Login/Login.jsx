import Form from '../Shared/Form';

export default function Login() {

  return (
    <div className="bg-yellow-300 w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-black">Welcome to the Pawn Structure Trainer</h1>
        <Form pageType={'login'} />
      </div>
    </div>
  )
}
