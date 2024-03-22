"use client";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid"; 
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Likes(){
  const router = useRouter();
  const handleButtonLike = async ()=>{
    try {
      //await fetch("Ruta al back para sumar 1 like");
      router.push("/like-dislike-report/like");
    } catch (error) {
      console.error(error);
    }
  }
  const handleButtonDislike = async ()=>{
    try {
      //await fetch("Ruta al back para sumar 1 dislike");
      router.push("/like-dislike-report/dislike");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <p className="mt-16 text-center">¿Como calificarias la cola que te dio Driver?</p>
      <div className="flex justify-center items-center">
        <HandThumbUpIcon className="fill-current text-white h-20 w-20 py-2 mx-24 mt-24 rounded-full bg-green-500 border-4 border-white shadow-lg shadow-slate-600"/>
        <HandThumbDownIcon className="fill-current text-white h-20 w-20 py-2 mx-24 mt-24 rounded-full bg-red-500 border-4 border-white shadow-lg shadow-slate-600"/>
       </div>
      <div className="flex justify-center items-center">
        <Button 
        onClick={handleButtonLike} 
        color="success"
        className="w-1/3 text-white text-center font-bold py-2 px-4 mx-4 mt-12 shadow-lg shadow-slate-600">
          ¡BUENA!
        </Button>
          
        <Button 
        onClick={handleButtonDislike} 
        color="danger"
        className="w-1/3 text-white text-center font-bold py-2 px-4 mx-4 mt-12 shadow-lg shadow-slate-600">
          ¡MALA!
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <Link 
        className="h-12 w-1/2 bg-yellow-400 hover:bg-yellow-200 text-black text-center font-bold py-3 px-4 mx-4 mt-12 rounded-lg shadow-lg shadow-slate-600"
        href="/like-dislike-report/report">
          DENUNCIAR
        </Link>
      </div>
        
    </div>
  );
}