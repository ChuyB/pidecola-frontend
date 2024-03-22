import { HandThumbDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ComentDislike from "../../../components/ComentDislike";

export default function Dislike(){
  return(
    <div>
      <p className="text-center mt-12 font-bold"> ¡Gracias por calificar la cola! </p>
      <div className="flex items-center justify-center">
        <HandThumbDownIcon className="fill-current text-white h-32 w-32 py-2 mx-24 mt-24 rounded-full bg-red-500 border-4 border-white"/>
      </div>
      <ComentDislike />
      
      <p className="text-center mt-8 font-bold"> ¡Gracias por usar PideCola 3.1!</p>
      <div className="flex items-center justify-center mt-8">
        <Link
        className="w-full bg-blue-500 hover:bg-blue-300 text-white text-center font-bold py-2 px-4 mx-4 mt-12 rounded-xl shadow-lg shadow-slate-600"
        href='/home'>
          FINALIZAR
        </Link>
      </div>
    </div>
  )
}