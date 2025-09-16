import ActivitiesList from "./ActivitiesList";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
export default function ActivitiesPage() {
  const { token } = useAuth();
  const { mutate, error } = useMutation("POST", "/activities", "activity");

  const AddAct = (formdata) => {
    let pakage = {};
    {
      formdata.forEach((value, key) => {
        pakage[key] = value;
      });
    }
    mutate(pakage);
  };
  if (!token) {
    return (
      <>
        <h1>Activities</h1>
        <ActivitiesList />
      </>
    );
  } else if (error) {
    return <code>{error}</code>;
  } else {
    return (
      <>
        <form action={AddAct}>
          <label>
            Activity Name
            <input name="name" />
          </label>
          <label>
            Description
            <input name="description" />
          </label>
          <button>Submit</button>
        </form>
        <h1>Activities</h1>
        <ActivitiesList />
      </>
    );
  }
}
