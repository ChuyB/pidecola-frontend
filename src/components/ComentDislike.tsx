"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const ComentDislike = () =>{
  const [coment, setComent] = useState("");
  const [isSend, setIsSend] = useState(false);

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
        <div className="mt-4">
          <label htmlFor="comentDislike" className="mr-4 font-bold">Comentario: </label>
          <input
            type="text"
            id="comentDislike"
            value={coment}
            onChange={handleComent}
            className="rounded-md w-full"
          />
        </div>
        <div className="flex justify-center items-center mt-4">
        <Button color="primary" type="submit" className="shadow-lg shadow-slate-600"> Comentar </Button>
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