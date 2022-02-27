import React from 'react'

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";


export default function EarthquakesRetrievePage() {
  const objectToAxiosParams = (earthquakes) => ({
    url: "/api/earthquakes/retrieve",
    method: "POST",
    params: {
      distanceKm: earthquakes.distanceKm,
      minMagnitude: earthquakes.minMagnitude
    }
  });
  /*
  const onSuccess = (earthquake) => {
    toast(`Searched for earthquakes within: ${earthquake.distanceKm} km and with a magnitude of at least ${earthquake.minMagnitude}`);
  }
  */
  const onSuccess = (earthquakes) => {
    toast(`${earthquakes.length} Earthquakes retrieved`);
  };
  
  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/earthquakes/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Navigate to="/earthquakes/list" />
  };
  
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Retrieve Earthquakes</h1>

        <EarthquakeForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  );
}
