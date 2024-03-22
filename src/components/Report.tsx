"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem, Button } from "@nextui-org/react";

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
    try {
      //await fetch("Ruta del backend que atiende la solicitud");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-8">
          <Select
          value={report}
          onChange={handleReport}
          placeholder="Escoja su tipo de denuncia"
          size="md"
          label= "Tipo de denuncia: "
          labelPlacement="outside"
          className="w-1/2 font-bold">
            {denuncias.map((denuncia)=>(
              <SelectItem key={denuncia} value={denuncia}>
                {denuncia}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-4">
          <Input
          type="textarea"
          value={coment}
          label = "Comentario: "
          labelPlacement="outside"
          placeholder="¿Por qué reportará al conductor?"
          onChange={handleComent}
          className="font-bold"
          />
        </div>
        <div className="flex justify-center items-center">
          <Button 
          type="submit"
          color="warning"
          className="h-12 w-100 text-black text-center font-bold py-3 px-4 mt-4 shadow-lg shadow-slate-600">
            HACER DENUNCIA 
          </Button>
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
