import { render, waitFor, fireEvent } from "@testing-library/react";
import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm";
import { earthquakeFixtures } from "fixtures/earthquakeFixtures";
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
    test("renders correctly when passing in an Earthquake ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <EarthquakeForm initialEarthquake={earthquakeFixtures.oneEarthquake} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/earthquakeFixtures-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/earthquakeFixtures-id/)).toHaveValue("12");
    });
    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("EarthquakeForm-Retrieve")).toBeInTheDocument());
        const submitButton = getByTestId("EarthquakeForm-Retrieve");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/distance is required../)).toBeInTheDocument());
        expect(getByText(/min_magnitude is required./)).toBeInTheDocument();
    });
    //No Error messsages on good input
    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <EarthquakeForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubrEarthquakeFormedditForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("EarthquakeForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });



});


