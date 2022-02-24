/*import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { useCurrentUser } from 'main/utils/currentUser'

export default function EarthquakesRetrievePage() {

  const currentUser = useCurrentUser();

  const { data: earthquakes, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/retrieve"],
      { method: "POST", url: "/api/earthquakes/retrieve" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <EarthquakesTable earthquakes={earthquakes} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}
*/

import React from 'react'

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

import { useBackend } from 'main/utils/useBackend';

export default function EarthquakesRetrievePage() {
  const objectToAxiosParams = (earthquake) => ({
    url: "/api/earthquakes/retrieve",
    method: "POST",
    params: {
      distance: earthquake.distanceKm,
      magnitude: earthquake.minMagnitude
    }
  });

  const onSuccess = (earthquake) => {
    toast(`Searched for earthquakes within: ${earthquake.distanceKm} km and with a magnitude of at least ${earthquake.minMagnitude}`);
  }
  /*
  useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/earthquakes/retrieve"],
    { method: "POST", 
    url: "/api/earthquakes/retrieve" },
    []
  );
  */
  

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/earthquakes/retrieve"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/earthquakes/list" />
  }
  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Retrieve Earthquakes</h1>

        <EarthquakeForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}
