"use client";
import { useState } from "react";

const ComentReport = () =>{
  const [coment, setComent] = useState("");
  const [report, setReport] = useState("");
  const [isSend, setIsSend] = useState(false);
  const denuncias = ["Acoso", "Agresion Verbal", "Agresion Fisica"];

  const handleReport = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReport(e.target.value);
  };

  const handleComent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComent(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSend(true);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-8">
          <label htmlFor="report" className="mr-4 font-bold">Tipo de Denuncia: </label>
          <select 
          id="report" 
          value={report} 
          onChange={handleReport} 
          className="rounded-md">
              {denuncias.map((denuncia)=>(
                <option key={denuncia} value={denuncia}>{denuncia}</option>
              ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="coment" className="mr-4 font-bold">Comentario: </label>
          <input
            type="text"
            id="coment"
            value={coment}
            onChange={handleComent}
            className="rounded-md w-full"
          />
        </div>
        <div className="flex justify-center items-center">
          <button 
          type="submit"
          className="h-12 w-100 bg-yellow-400 hover:bg-yellow-200 text-black text-center font-bold py-3 px-4 mt-4 rounded-lg shadow-lg shadow-slate-600">
            HACER DENUNCIA
          </button>
        </div>
      </form>
      {isSend && 
      <div className="font-bold">
        <p>Enviar a FCEUSB </p>
        <p>DENUNCIA POR: {report} </p>
        <p>Se anexa el siguiente comentario: {coment}</p>
      </div>
      }
    </div>
  );
};

export default ComentReport;
