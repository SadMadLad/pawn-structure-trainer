import Form from '../Shared/Form';

export default function Register() {

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-full bg-teal-500">
        <img src="/pawn.jpg" className="w-full h-full object-cover"/>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div>
          <h1 className="text-3xl text-center font-black text-white">Register</h1>
          <Form pageType={'register'} />
        </div>
      </div>
    </div>
  )
}
