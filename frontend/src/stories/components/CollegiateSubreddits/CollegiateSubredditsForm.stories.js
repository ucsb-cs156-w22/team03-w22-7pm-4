import React from 'react';

import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm"
import { CollegiateSubredditFixtures } from 'fixtures/CollegiateSubredditFixtures';

export default {
    title: 'components/CollegiateSubreddits/CollegiateSubredditForm',
    component: CollegiateSubredditForm
};


const Template = (args) => {
    return (
        <CollegiateSubredditForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    oneSubreddit: CollegiateSubredditFixtures.oneSubreddit,
    submitText: "",
    submitAction: () => { }
};
