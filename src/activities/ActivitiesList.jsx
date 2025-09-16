import useQuery from "../api/useQuery";
import ActivitiesItem from "./ActivitiesItem";
export default function ActivitiesList() {
  const {
    data: activities,
    error,
    loading,
  } = useQuery("/activities", "activity");

  if (loading || !activities) {
    return <p>Loading in progress...</p>;
  }

  if (error) {
    return <code>{error}</code>;
  }

  return (
    <ul>
      {activities.map((activity) => {
        return <ActivitiesItem key={activity.id} activity={activity} />;
      })}
    </ul>
  );
}
