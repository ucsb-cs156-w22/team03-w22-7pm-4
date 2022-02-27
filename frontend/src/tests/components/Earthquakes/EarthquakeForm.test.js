import { render, waitFor, fireEvent } from "@testing-library/react";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { earthquakesFixtures } from "fixtures/earthquakesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("EarthquakeForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        
        await waitFor(() => expect(getByText(/distance in km from Storke Tower/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/minimum magnitude of an earthquake/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Retrieve/)).toBeInTheDocument());
    });
    /*
    test("renders correctly when passing in an Earthquake ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <EarthquakeForm initialEarthquake={earthquakesFixtures.oneEarthquake} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/EarthquakeForm-distance/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/EarthquakeForm-id/)).toHaveValue("12");
    });
    */
    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-Retrieve")).toBeInTheDocument());
        const submitButton = getByTestId("EarthquakeForm-Retrieve");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/distanceKm is required./)).toBeInTheDocument());
        expect(getByText(/minMagnitude is required./)).toBeInTheDocument();
    });
    //No Error messsages on good input
    test("No Error messsages on good input", async () => {
        
        const mockSubmitAction = jest.fn();
        const { getByTestId, queryByText } = render(
            <Router  >
                <EarthquakeForm submitAction={mockSubmitAction}/>
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-Retrieve")).toBeInTheDocument());
        const distanceKm = getByTestId("EarthquakeForm-distance");
        const minMagnitude = getByTestId("EarthquakeForm-minMagnitude");
        const submitButton = getByTestId("EarthquakeForm-Retrieve");

        fireEvent.change(distanceKm, { target: { value: '100' } });
        fireEvent.change(minMagnitude, { target: { value: '2' } });    
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/distanceKm is required./)).not.toBeInTheDocument();
        expect(queryByText(/minMagnitude is required./)).not.toBeInTheDocument();
    });

    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("EarthquakeForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });



});


