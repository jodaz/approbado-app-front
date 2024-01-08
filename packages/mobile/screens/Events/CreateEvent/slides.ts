import { Routes } from "../../routes";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const slides = [
    {
        id: 1,
        component: StepOne,
        name: Routes.CreateEventStepOne,
        options: {
            tabBarLabel: '1'
        }
    },
    {
        id: 2,
        component: StepTwo,
        name: Routes.CreateEventStepTwo,
        options: {
            tabBarLabel: '2'
        }
    },
    {
        id: 3,
        component: StepThree,
        name: Routes.CreateEventStepThree,
        options: {
            tabBarLabel: '3'
        }
    },
];

export default slides
