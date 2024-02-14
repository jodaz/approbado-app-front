import * as React from 'react'
import { Row } from '../../../components';
import EmptyNotifications from '@approbado/lib/illustrations/EmptyNotifications.svg'

const NoNotifications = () => (
    <Row justify='center' align='center' style={{
        width: '100%',
        height: '100%'
    }}>
        <EmptyNotifications />
    </Row>
);

export default NoNotifications
