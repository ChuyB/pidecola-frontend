"use client";
import { useState, useEffect } from "react"

const TextAlternator = () =>{
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "¡Por favor! sigue nuestras medidas sugeridas para que nuestra comunidad permanezca siendo increíble.",
    "Recuerda que juntos podemos crear un ambiente positivo, sano y respetuoso para todos."
  ]

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentText((prevText)=>(prevText + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return(
    <div className=" bg-yellow-400 rounded-md text-center h-auto shadow-lg shadow-slate-600">
      <p className=" text-blue-600 font-bold text-2xl">{texts[currentText]}</p>
    </div>
  )
}

export default TextAlternator;
