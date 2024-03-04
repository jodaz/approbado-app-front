import { ScrollView } from "react-native"
import { horizontalScale } from "../styles/scaling"
import { useTheme } from "styled-components"

const ScrollViewContainer = ({ children }) => {
    const theme = useTheme();

    return (
        <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: horizontalScale(theme.space[3])
            }}
        >
            {children}
        </ScrollView>
    )
}

export default ScrollViewContainer
