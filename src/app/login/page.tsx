import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import autostop from "../../assets/autostop.jpg";

export default function Login() {
  return (
    <div className="relative flex flex-grow items-center justify-center">
      <Image
        src={autostop}
        alt="Imágen de fondo de una persona con un pulgar levantado"
        placeholder="blur"
        className="object-cover absolute h-full w-full"
      />
      <LoginForm />
    </div>
  );
}
