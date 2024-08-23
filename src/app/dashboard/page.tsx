import { useUser } from "@/contexts/UserContext";

export default function Dashboard() {
  const { state } = useUser();
  const { user } = state;

  return (
    <div>
      <h1>Hello {user?.name}</h1>
    </div>
  );
}