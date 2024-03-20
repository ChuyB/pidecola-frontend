import { HandThumbUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Like(){
  return(
    <div>
      <p className="text-center mt-16 font-bold"> ¡Gracias por calificar la cola! </p>
      <div className="flex items-center justify-center">
        <HandThumbUpIcon className="fill-current text-white h-32 w-32 py-2 mx-24 mt-24 rounded-full bg-green-500 border-4 border-white"/>
      </div>
      <p className="text-center mt-16 font-bold"> ¡Gracias por usar PideCola 3.1!</p>
      <div className="flex items-center justify-center mt-16">
        <Link
        className="w-full bg-blue-500 hover:bg-blue-300 text-white text-center font-bold py-2 px-4 mx-4 mt-12 rounded-xl shadow-lg shadow-slate-600"
        href='/dashboard/likes'>
          FINALIZAR
        </Link>
      </div>
    </div>
  )
}