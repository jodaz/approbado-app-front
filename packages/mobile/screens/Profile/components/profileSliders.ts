import About from "./About";
import Achievements from "./Achievements";
import Publications from "./Publications";

const profileSliders = [
    {
        id: 1,
        component: Achievements,
        tabName: 'Logros'
    },
    {
        id: 2,
        component: About,
        tabName: 'Sobre mí'
    },
    {
        id: 3,
        component: Publications,
        tabName: 'Publicaciones'
    },
];

export default profileSliders
