import React from 'react'
import { useBackend } from 'main/utils/useBackend';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { useCurrentUser } from 'main/utils/currentUser'
import { Button } from 'react-bootstrap';
export default function EarthquakesIndexPage() {
  const currentUser = useCurrentUser();
  const { data: earthquakes, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"],
      { method: "GET", url: "/api/earthquakes/all" },
      []
    );
  
  // const { data: earthquakes, error: _error, status: _status } =
  //   useBackend(
  //     // Stryker disable next-line all : don't test internal caching of React Query
  //     ["/api/earthquakes/purge"],
  //     { method: "POST", url: "/api/earthquakes/purge" },
  //     []
  //   );
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <EarthquakesTable earthquakes={earthquakes} currentUser={currentUser} />
        <Button>Purge</Button>
      </div>

    </BasicLayout>
  )
}









