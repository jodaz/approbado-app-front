import About from "./components/About";
import Achievements from "./components/Achievements";
import Publications from "./components/Publications";

const profileSliders = [
    {
        name: 'Achievements',
        component: Achievements,
        options: {
            tabBarLabel: 'Logros'
        }
    },
    {
        name: 'About',
        component: About,
        options: {
            tabBarLabel: 'Sobre mí'
        }
    },
    {
        name: 'Publications',
        component: Publications,
        options: {
            tabBarLabel: 'Publicaciones'
        }
    },
];

export default profileSliders
