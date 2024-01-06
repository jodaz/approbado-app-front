import * as React from 'react'
import { Row } from '../../../components';
import EmptyEvents from '@approbado/lib/illustrations/EmptyEvents.svg'

const NoEvents = () => (
    <Row justify='center' align='center' style={{
        width: '100%',
        height: '100%'
    }}>
        <EmptyEvents />
    </Row>
);

export default NoEvents
