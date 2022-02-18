import React from 'react';

import EarthquakeForm from "main/components/Earthquakes/EarthquakeForm"
//import { ucsbDatesFixtures } from 'fixtures/ucsbDatesFixtures';

export default {
    title: 'components/Earthquakes/EarthquakeForm',
    component: EarthquakeForm
};


const Template = (args) => {
    return (
        <EarthquakeForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Retrieve",
    submitAction: () => { console.log("Retrieve was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    //ucsbDate: ucsbDatesFixtures.oneDate,
    submitText: "",
    submitAction: () => { }
};
