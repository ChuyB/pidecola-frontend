import { User } from "@/lib/types/user.type";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import ProfileDetailsEditForm from "@/components/Profile/ProfileDetailsEditForm";

type UserProfileData =
  | User
  | {
      first_name: string;
      last_name: string;
      likes: number;
      dislikes: number;
    };

const ProfileCard = async ({ user }: { user: UserProfileData }) => {
  return (
    <Card className="grow w-full max-w-sm">
      <CardHeader className="relative flex flex-col gap-4 items-center py-10">
        {"id" in user && <ProfileDetailsEditForm userData={user} />}
        <Avatar
          color="warning"
          isBordered
          name={user.first_name}
          className="w-20 h-20 text-large"
        />
        <h1 className="uppercase text-bold text-lg text-gray-500">{`${user.first_name} ${user.last_name}`}</h1>
      </CardHeader>
      <CardBody className="flex gap-4">
        {"email" in user && (
          <Tag text="Dirección de correo ">
            <span className="text-primary">{user.email}</span>
          </Tag>
        )}
        {"phone_number" in user && (
          <Tag text="Número telefónico ">
            <span>{user.phone_number}</span>
          </Tag>
        )}
      </CardBody>
      <CardFooter className="flex justify-center gap-2">
        <Tag text="Reviews" />
        <Chip
          size="sm"
          variant="bordered"
          color="success"
          startContent={<HandThumbUpIcon className="h-1/2" />}
        >
          {user.likes}
        </Chip>
        <Chip
          size="sm"
          variant="bordered"
          color="danger"
          startContent={<HandThumbDownIcon className="h-1/2" />}
        >
          {user.dislikes}
        </Chip>
      </CardFooter>
    </Card>
  );
};

const Tag = ({
  children,
  text,
}: {
  children?: React.ReactNode;
  text: string;
}) => {
  return (
    <p>
      <span className="uppercase text-sm text-gray-500">{text}</span>
      <br />
      {children ?? ""}
    </p>
  );
};

export default ProfileCard;
