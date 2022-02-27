import { fireEvent, render, waitFor } from "@testing-library/react";
import EarthquakesRetrievePage from "main/pages/Earthquakes/EarthquakesRetrievePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { earthquakesFixtures } from "fixtures/earthquakesFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});



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
    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const earthquake = {
            distanceKm: 30,
            minMagnitude: 1.2,
            //need to have otherwise is undefined?
            length: 1,
        };

        axiosMock.onPost("/api/earthquakes/retrieve").reply( 202, earthquake );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <EarthquakesRetrievePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("EarthquakeForm-distance")).toBeInTheDocument();
        });

        const distanceField = getByTestId("EarthquakeForm-distance");
        const magnitudeField = getByTestId("EarthquakeForm-minMagnitude");
        const submitButton = getByTestId("EarthquakeForm-Retrieve");

        fireEvent.change(distanceField, { target: { value: '30' } });
        fireEvent.change(magnitudeField, { target: { value: '1.2' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "distanceKm": "30",
            "minMagnitude": "1.2",
        });

        expect(mockToast).toBeCalledWith("1 Earthquakes retrieved");
        expect(mockNavigate).toBeCalledWith({ "to": "/earthquakes/list" });
    });
});
