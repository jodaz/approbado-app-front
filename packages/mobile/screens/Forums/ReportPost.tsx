import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Image, ActivityIndicator, Linking } from 'react-native';
import { ReportReason } from '@approbado/lib/types/models'
import {
    Container,
    Button,
    Row,
    Text,
    TitleBar,
    RadioButton
} from '../../components';
import { createReport, listReportReasons } from '@approbado/lib/services/reports.services'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import setFormErrors from '@approbado/lib/utils/setFormErrors'

const ReportPost = ({ route, navigation }) => {
    const post = route?.params?.post;
    const { control, handleSubmit, setError, formState } = useForm();
    const { dispatch } = useToast()
    const [reasons, setReasons] = React.useState<null | ReportReason[]>(null);

    const onSubmit = async values => {
        const selectedReason = reasons.find(({ item } : ReportReason) => item === values.reason)
        const formData = {
            reason_id: selectedReason.id,
            post_id: post.id
        }

        const { success, status, data } = await createReport(formData);

        if (success) {
            await openToast(
                dispatch,
                'success',
                '¡Reporte realizado!'
            )
            navigation.goBack();
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            } else {
                console.log(data)
                await openToast(
                    dispatch,
                    'error',
                    'Ha ocurrido un error.'
                )
            }
        }
    };

    const fetchReasons = React.useCallback(async () => {
        const { success, data } = await listReportReasons()

        if (success) {
            setReasons(data)
        }
    }, []);

    React.useEffect(() => {
        fetchReasons();
    }, [])

    return (
        <Container>
            <TitleBar>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ height: 25, width: 150 }}
                />
            </TitleBar>
            <Row size={4}>
                <Text align='center'>
                    Reportar una publicación
                </Text>
            </Row>
            <Row size={1}>
                <Text align='center' variant='secondary'>
                    Ayúdanos a entender el problema
                </Text>
            </Row>
            <Row size={6}>
                {!reasons
                    ? <ActivityIndicator size={48} color='#000' />
                    : (
                        <RadioButton
                            control={control}
                            name='reason'
                            options={reasons.map(({ item }: ReportReason) => item)}
                        />
                )}
            </Row>
            <Row size={2}>
                <Button
                    isLoading={formState.isSubmitting}
                    fullWidth
                    disabled={!reasons}
                    onPress={handleSubmit(onSubmit)}
                >
                    Reportar publicación
                </Button>
            </Row>
            <Row size={2}>
                <Text
                    align='center'
                    variant='primary'
                    fontSize={16}
                    fontWeight={400}
                >
                    Para más infomación sobre advertencia y sanciones,
                    <Text
                        color="info"
                        variant="main"
                        onPress={() => Linking.openURL('https://www.lipsum.com/')}
                        decoration='underline'
                    >
                        click aquí
                    </Text>
                </Text>
            </Row>
        </Container>
    );
}

export default ReportPost
