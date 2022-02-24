import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function EarthquakeForm({submitAction, buttonLabel="Retrieve" }) {
    //distance in km from Storke Tower
    //minimum magnitude of an earthquake

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: {}, }
    );
    const navigate = useNavigate();
    return (

        <Form onSubmit={handleSubmit(submitAction)}>
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="distance">distance in km from Storke Tower</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-distance"
                    id="distance"
                    type="text"
                    isInvalid={Boolean(errors.distance)}
                    //need to check that distance is a number below
                    {...register("distance", {required: true})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.distance && 'distance is required.'}
                    
                </Form.Control.Feedback>
            </Form.Group>
        

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="min_magnitude">minimum magnitude of an earthquake</Form.Label>
                <Form.Control
                    data-testid="EarthquakeForm-min_magnitude"
                    id="min_magnitude"
                    type="text"
                    isInvalid={Boolean(errors.min_magnitude)}
                    {...register("min_magnitude", {
                        required: "min_magnitude is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.min_magnitude?.message}
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
