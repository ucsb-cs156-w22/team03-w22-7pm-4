import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function EarthquakeForm({initialEarthquakes, submitAction, buttonLabel="Retrieve" }) {
    //distance in km from Storke Tower
    //minimum magnitude of an earthquake

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialEarthquakes || {}, }
    );
    const navigate = useNavigate();
    return (

        <Form onSubmit={handleSubmit(submitAction)}>
            {initialEarthquakes}
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="distance">distance in km from Storke Tower</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-distance"
                    id="distanceKm"
                    type="text"
                    isInvalid={Boolean(errors.distanceKm)}
                    //need to check that distance is a number below
                    {...register("distanceKm", {required: 'distanceKm is required.'})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.distanceKm?.message}
                    
                </Form.Control.Feedback>
            </Form.Group>
        

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="minMagnitude">minimum magnitude of an earthquake</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-minMagnitude"
                    id="minMagnitude"
                    type="text"
                    isInvalid={Boolean(errors.minMagnitude)}
                    {...register("minMagnitude", {
                        required: "minMagnitude is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.minMagnitude?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="Retrieve"
                data-testid="EarthquakeForm-Retrieve"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="EarthquakeForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default EarthquakeForm;
