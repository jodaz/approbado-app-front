import { ScrollView } from "react-native"
import { horizontalScale } from "../styles/scaling"

const ScrollViewContainer = ({ children }) => {
    return (
        <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: horizontalScale(20)
            }}
        >
            {children}
        </ScrollView>
    )
}

export default ScrollViewContainer
