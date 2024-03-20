import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid"; 
  import Link from "next/link";
  export default function Likes(){
    return (
      <div>
        <p className="mt-16 text-center">¿Como calificarias la cola que te dio Driver?</p>
        <div className="flex justify-center items-center">
          <HandThumbUpIcon className="fill-current text-white h-20 w-20 py-2 mx-24 mt-24 rounded-full bg-green-500 border-4 border-white shadow-lg shadow-slate-600"/>
          <HandThumbDownIcon className="fill-current text-white h-20 w-20 py-2 mx-24 mt-24 rounded-full bg-red-500 border-4 border-white shadow-lg shadow-slate-600"/>
        </div>
        <div className="flex justify-center items-center">
          <Link 
          className="w-1/3 bg-green-500 hover:bg-green-300 text-white text-center font-bold py-2 px-4 mx-4 mt-12 rounded-xl shadow-lg shadow-slate-600"
          href="/dashboard/likes/like">
            ¡BUENA!
          </Link>
          <Link 
          className="w-1/3 bg-red-500 hover:bg-red-300 text-white text-center font-bold py-2 px-4 mx-4 mt-12 rounded-xl shadow-lg shadow-slate-600"
          href="/dashboard/likes/dislike">
            ¡MALA!
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link 
          className="h-12 w-1/2 bg-yellow-400 hover:bg-yellow-200 text-black text-center font-bold py-3 px-4 mx-4 mt-12 rounded-lg shadow-lg shadow-slate-600"
          href="/dashboard/likes/report">
            DENUNCIAR
          </Link>
        </div>
        
      </div>
    );
  }