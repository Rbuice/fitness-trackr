import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
export default function ActivitiesList() {
  const {
    data: activities,
    error,
    loading,
  } = useQuery("/activities", "activity");
  const { mutate, error: delerror } = useMutation("DELETE", "/activites", [
    "activity",
  ]);
  const { token } = useAuth();
  const deleter = () => {
    mutate();
  };
  if (loading || !activities) {
    return <p>Loading in progress...</p>;
  }

  if (error) {
    return <code>{error}</code>;
  }
  if (delerror) {
    return <code>{delerror}</code>;
  }
  if (!token) {
    return (
      <ul>
        {activities.map((activity) => {
          return (
            <li key={activity.id}>
              <h2>{activity.name}</h2>
              <h2>{activity.description}</h2>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <ul>
        {activities.map((activity) => {
          return (
            <li key={activity.id}>
              <h2>{activity.name}</h2>
              <h2>{activity.description}</h2>
              <button onClick={() => deleter(activity)}>Delete</button>
            </li>
          );
        })}
      </ul>
    );
  }
}
