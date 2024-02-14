import React from 'react';
import { Dimensions, View } from 'react-native';
import { File } from '@approbado/lib/types/models'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Text } from '../../../components';
import { download } from '@approbado/lib/services/files.services'
import { useToast, openToast } from '@approbado/lib/contexts/ToastContext'
import PDF from '@approbado/lib/icons/PDF2.svg'
import styled from 'styled-components/native';
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

const { width } = Dimensions.get('screen')

const Pressable = styled.Pressable`
    display: flex;
    align-items: start;
    margin-horizontal: ${horizontalScale(width * .02)}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: ${width * .4}px;
    height: fit-content;
    position: relative;
`

const ResourceCard = ({ file }: { file: File }) : JSX.Element => {
    const { dispatch } = useToast()

    const requestFileWritePermission =async () => {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        console.log(permissions.granted);
        if (!permissions.granted) {
            console.log('File write Permissions Denied!!')
            return {
                access: false,
                directoryUri: null
            };
        }
        return {
            access:true,
            directoryUri: permissions.directoryUri
        };
    }

    const saveReportFile = async (pdfData: any, directoryUri: string) => {
        try {
            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, file.title, 'application/pdf')

            const fr = new FileReader();
            fr.onload = async () => {
                // const fileUri = `${FileSystem.documentDirectory}/${file.title}.pdf`;
                const response = await FileSystem.writeAsStringAsync(
                    fileUri,
                    fr.result.split(',')[1],
                    {
                        encoding: FileSystem.EncodingType.Base64
                    }
                );

                if (response) {
                    await openToast(
                        dispatch,
                        'error',
                        'Ha ocurrido un error.'
                    )
                } else {
                    console.log(response)
                }
            };
            fr.readAsDataURL(pdfData);
        } catch (error) {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    async function fetchReportForm() {

        const { success, data, error } = await download(file.id);

        if (success) {
            const hasPermissions = await requestFileWritePermission();
            if (hasPermissions.access) {
                saveReportFile(data, hasPermissions.directoryUri)
            }
        } else {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    const handleDownload = async () => {
        const { success, data, error } = await download(file.id);

        if (success) {
            const fr = new FileReader();
            fr.onload = async () => {
                const fileUri = `${FileSystem.documentDirectory}/${file.title}.pdf`;
                await FileSystem.writeAsStringAsync(
                    fileUri,
                    fr.result.split(',')[1],
                    {
                        encoding: FileSystem.EncodingType.Base64
                    }
                );
                Sharing.shareAsync(fileUri)
            };
            fr.readAsDataURL(data);
        } else {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    };

    return (
        <Pressable onPress={fetchReportForm} key={file?.id}>
            <View style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.12,
                shadowRadius: 12,
                elevation: 6,
                backgroundColor: '#BDCDE0',
                borderRadius: scaleFontSize(12),
                flexDirection: 'row',
                paddingVertical: verticalScale(20),
                marginVertical: verticalScale(4),
                justifyContent: 'center'
            }}>
                <PDF />
            </View>
            <Text align='left'>
                {file.title}
            </Text>
        </Pressable>
    )
}

export default ResourceCard;
