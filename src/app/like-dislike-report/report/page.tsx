import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ComentReport from "../../../components/Report";

export default function Like(){

  return(
    <div>
      <p className="text-center mt-12 font-bold"> ¡Denuncia al conductor con la FCE! </p>
      <div className="flex items-center justify-center">
        <ExclamationCircleIcon className="fill-current text-yellow-500 h-40 w-40 mt-8 rounded-full bg-black"/>
      </div>
      <ComentReport />
      
      <p className="text-center mt-8 font-bold"> ¡Gracias por usar PideCola 3.1!</p>
      <div className="flex items-center justify-center mt-8">
        <Link
        className="w-full bg-blue-500 hover:bg-blue-300 text-white text-center font-bold py-2 px-4 mx-4 mt-6 rounded-xl shadow-lg shadow-slate-600"
        href='/dashboard/likes'>
          FINALIZAR
        </Link>
      </div>
    </div>
  )
}