import { render } from "@testing-library/react";
import EarthquakesRetrievePage from "main/pages/Earthquakes/EarthquakesRetrievePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { earthquakesFixtures } from "fixtures/earthquakesFixtures";



describe("EarthquakesRetrievePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);
    axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesRetrievePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });
    test("renders one Earthquake without crashing for regular user", async () => {
        //setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/earthquakes/retrieve").reply(200, earthquakesFixtures.oneEarthquake);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesRetrievePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

    });
});
