import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
export default function ActivitiesItem({ activity }) {
  const { mutate } = useMutation("DELETE", "/activities/" + activity.id, [
    "activity",
  ]);
  const { token } = useAuth();
  const deleter = () => {
    mutate();
  };
  if (!token) {
    return (
      <li key={activity.id}>
        <h2>{activity.name}</h2>
        <h2>{activity.description}</h2>
      </li>
    );
  } else {
    return (
      <li key={activity.id}>
        <h2>{activity.name}</h2>
        <h2>{activity.description}</h2>
        <button onClick={() => deleter()}>Delete</button>
      </li>
    );
  }
}
