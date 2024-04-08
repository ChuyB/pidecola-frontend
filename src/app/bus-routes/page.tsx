import Link from "next/link";

export default function BusesRoutes() {
  return (
    <div>
      <h1 className="text-center mt-12 font-bold text-xl text-blue-950 dark:text-yellow-50">Rutas de Buses USB </h1>
      <h3 className="text-center mt-4 font-bold text-l text-blue-950 dark:text-yellow-50">01/04/2024 - 05/04/2024 </h3>
      <div className="flex justify-around">
        <div className="mt-8">
        <h2 className="font-bold text-center justify-center">Hacia la USB</h2>
        <ul className="list-disc mt-4 mx-8">
          <li>6:20am: Coche, La Rinconada/USB</li>
          <li>7.30am: 
            <ul>
            <li>Coche, La Rinconada/USB</li>  
            <li>Bellas Artes/USB</li>
            <li>Chacaito/USB</li>
            <li>La Paz/USB</li>
            <li>La Eneca/USB</li>
            <li>La Hoyadita/USB</li>
            <li>Gato Negro/USB Sede del Litoral</li>
            </ul></li>
          <li>8:15am: Baruta/USB</li>
        </ul>
        </div>
        <div className="mt-8 ">
          <h2 className="font-bold text-center justify-center">Desde la USB</h2>
          <ul className="list-disc mt-4 mx-8">
          <li>1:00pm:
            <ul>
            <li>USB/Coche,La Rinconada</li>
            <li>USB/Baruta</li>
            </ul></li>
            <li>2:30pm: USB/Coche,La Rinconada</li>
            <li>3:00pm: USB/Baruta</li>
            <li>4:00pm:
            <ul>
            <li>USB/Coche,La Rinconada</li>
            <li>USB/La Eneca</li>
            <li>USB/La Hoyadita</li>
            <li>USB Sede del Litoral/Gato Negro</li>
            </ul></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4 italic text-sm">
        <p>Los horarios y rutas estarán sujetos a cambios de acuerdo a la demanda.</p>
        <p>Cualquier novedad será informada por el medio oficial del Transporte USB.</p>
      </div>

      <p className="text-center mt-4 font-bold  text-blue-950 dark:text-yellow-50 ">Para más información, visite el canal oficial del Transporte USB </p>
      <div className="flex items-center justify-center mt-4">
        <Link
          className="w-auto bg-gradient-to-br from-yellow-500  via-orange-500 to-red-500 font-bold text-white text-center py-2 px-2 mx-20 mt-4 mb-4 rounded-xl shadow-lg shadow-slate-600"
          href='https://t.me/transporte_usb' target="_blank">
            TRANSPORTE USB TELEGRAM
        </Link>
      </div>
    </div>
  );
}
