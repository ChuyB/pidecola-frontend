"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";

const ComentDislike = () =>{
  const [coment, setComent] = useState("");
  const [isSend, setIsSend] = useState(false);

  const handleComent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComent(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSend(true);
    try {
      //await fetch("Direccion de backend donde se envia el comentario");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mt-4">
          <Input
          type="textarea"
          value={coment}
          label = "Comentario"
          labelPlacement="outside"
          placeholder="¿Por qué califiacará negativo al conductor?"
          onChange={handleComent}>
          </Input>
        </div>
        <div className="flex justify-center items-center mt-4">
          <Button 
          color="primary" 
          type="submit" 
          className="shadow-lg shadow-slate-600"> 
          Comentar 
          </Button>
        </div>
      </form>
      {isSend && 
      <div className="font-bold">
        <p>Se anexa el siguiente comentario: {coment}</p>
      </div>
      }
    </div>
  );
};

export default ComentDislike;