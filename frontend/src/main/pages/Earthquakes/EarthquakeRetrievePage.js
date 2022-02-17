import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDateForm from "main/components/Earthquakes/earthquakesForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function EarthquakesRetrievePage() {

  const objectToAxiosParams = (earthquake) => ({
    url: "/api/earthquakes/retrieve",
    method: "POST",
    params: {
        distance: earthquake.distance,
        min_magnitude: earthquake.min_magnitude
    }
  });

  const onSuccess = (earthquake) => {
    toast(`Searched for earthquakes within: ${earthquake.distance} km and with a magnitude of at least
    name: ${earthquake.min_magnitude}`);
  }
  /*
  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/ucsbdates/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/ucsbdates/list" />
  }
  */

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Retrieve Earthquakes</h1>

        <EarthquakeForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}