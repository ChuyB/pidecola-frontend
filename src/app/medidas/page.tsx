import { medidasBio, medidasUsuario, medidasConductor } from "../../assets/medidas/medidas"
import TextAlternator from "../../components/TextAlternator"

export default function MedidasPage(){
  return(
    <div>
      <TextAlternator />
      <div className="m-4 p-4">
        <p className="font-bold text-2xl"> Medidas de Bioseguridad </p>
        <ul className="list-disc">
          {medidasBio.map((medida)=>(
            <li key={medida}>{medida}</li>
          ))}
        </ul>
      </div>
      <div className="m-4 p-4">
      <p className="font-bold text-2xl"> Medidas para el Usuario</p>
        <ul className="list-disc">
          {medidasUsuario.map((medida)=>(
            <li key={medida}>{medida}</li>
          ))}
        </ul>
      </div>
      <div className="m-4 p-4">
      <p className="font-bold text-2xl"> Medidas para el Conductor</p>
        <ul className="list-disc">
          {medidasConductor.map((medida)=>(
            <li key={medida}>{medida}</li>
          ))}
        </ul>
      </div>
    </div>

    
  )
}
