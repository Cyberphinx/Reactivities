import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Image, Tab, TabProps } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

export default observer(function ProfileActivities() {
    const { profileStore } = useStore();
    const { loadActivities, profile, userActivity, loadingActivities } = profileStore;

    useEffect(() => {
        loadActivities(profile!.username);
    }, [loadActivities, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadActivities(profile!.username, panes[data.activeIndex as number].pane.key);
    };

    return (
        <Tab.Pane loading={loadingActivities} >
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar'
                        content={'Activities'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab panes={panes} onTabChange={(e, data) => handleTabChange(e, data)} />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userActivity.map((activity: UserActivity) => (
                            <Card key={activity.id} as={Link} to={`/activities/${activity.id}`}>
                                <Image src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }} />
                                <Card.Content>
                                    <Card.Header>{activity.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(activity.date),
                                            'do LLL')}</div>
                                        <div>{format(new Date(activity.date),
                                            'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>

        </Tab.Pane>
    )
});