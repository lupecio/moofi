import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 container">
      <Avatar>
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
      <img src="/logo.svg" />

      <img src="/outline-notifications.svg" />
    </header>
  );
}
