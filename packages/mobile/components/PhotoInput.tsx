import React, { useState } from 'react';
import { Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import formDataHandler from '@approbado/lib/utils/formDataHandler'
import { sendMessage } from '@approbado/lib/services/chat.services'

const Button = styled.TouchableOpacity`
    padding: 10px;
`

export default function PhotoInput({ chat_id }) {
	const [uploading, setUploading] = useState(false);

    const saveImage = async (uri: string) => {
        const fileExtension = uri.split('.').pop();
        const filename = new Date().getTime() + '.' + fileExtension;

        const fileObject = {
            uri: uri,
            name: 'image.png',
            type: 'image/png'
        }

        return fileObject;
    };

	const selectImage = async (useLibrary: boolean) => {
		let result;
		const options: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.75
		};

		if (useLibrary) {
			result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);
		}

		// Save image if not cancelled
		if (!result.canceled) {
            const fileObject = await saveImage(result.assets[0].uri)

			uploadImage(fileObject);
		}
	};

    // Upload image to server
    const uploadImage = async (image: any) => {
        setUploading(true);

        const formData = await formDataHandler({
            file: image
        }, 'file')

        const { success, data } = await sendMessage(chat_id, formData)

        setUploading(false);
    };

    return (
        <Button disabled={uploading} onPress={() => selectImage(true)}>
            <Camera size={24} color='#000' />
        </Button>
    )
}
