import { render, waitFor, fireEvent } from "@testing-library/react";
import UCSBSubjectForm from "main/components/UCSBSubjects/UCSBSubjectForm";
import { ucsbSubjectsFixtures } from "fixtures/ucsbSubjectsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("UCSBSubjectForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <UCSBSubjectForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Subject Code/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a UCSBSubject ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <UCSBSubjectForm initialUCSBSubject={ucsbSubjectsFixtures.oneSubject} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/UCSBSubjectForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/UCSBSubjectForm-id/)).toHaveValue("1");
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <UCSBSubjectForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("UCSBSubjectForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Subject Code is required./)).toBeInTheDocument());
        expect(getByText(/Subject Translation is required./)).toBeInTheDocument();
        expect(getByText(/College Code is required./)).toBeInTheDocument();
        expect(getByText(/Dept Code is required./)).toBeInTheDocument();
        expect(getByText(/Related dept Code is required./)).toBeInTheDocument();
        expect(getByText(/Inactive is required/)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <UCSBSubjectForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectForm-subjectCode")).toBeInTheDocument());

        const subjectCodeField = getByTestId("UCSBSubjectForm-subjectCode");
        const subjectTranslationField = getByTestId("UCSBSubjectForm-subjectTranslation");
        const deptCodeField = getByTestId("UCSBSubjectForm-deptCode");
        const collegeCodeField = getByTestId("UCSBSubjectForm-collegeCode");
        const relDeptCodeField = getByTestId("UCSBSubjectForm-relDeptCode");
        const inactiveField = getByTestId("UCSBSubjectForm-inactive");
        const submitButton = getByTestId("UCSBSubjectForm-submit");

        fireEvent.change(subjectCodeField, { target: { value: 'CMPSC' } });
        fireEvent.change(subjectTranslationField, { target: { value: 'Computer Science' } });
        fireEvent.change(deptCodeField, { target: { value: 'CMPSC' } });
        fireEvent.change(collegeCodeField, { target: { value: 'COE' } });
        fireEvent.change(relDeptCodeField, { target: { value: 'CMPSC' } });
        fireEvent.change(inactiveField, { target: { value: 'false' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/Subject Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/Subject Translation is required./)).not.toBeInTheDocument();
        expect(queryByText(/Dept Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/College Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/Related dept Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/Inactive is required and must be either true or false./)).not.toBeInTheDocument();

    });

    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <UCSBSubjectForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectForm-inactive")).toBeInTheDocument());
        const inactiveField = getByTestId("UCSBSubjectForm-inactive");
        const submitButton = getByTestId("UCSBSubjectForm-submit");

        fireEvent.change(inactiveField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Inactive is required and must be either true or false./)).toBeInTheDocument());
    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <UCSBSubjectForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("UCSBSubjectForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});