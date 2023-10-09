const slides = [
    {
        id: 1,
        image: require('../../assets/judge.png'),
        title: 'Aprende derecho procesal y civil de forma práctica y divertida.',
        buttons: {
            discard: true,
            next: {
                label: 'Siguiente',
                color: 'secondary'
            }
        }
    },
    {
        id: 2,
        image: require('../../assets/team_spirit.png'),
        title: 'Practica para tus exámenes de forma individual o en grupo.',
        buttons: {
            discard: false,
            next: {
                label: 'Siguiente',
                color: 'secondary'
            }
        }
    },
    {
        id: 3,
        image: require('../../assets/winners.png'),
        title: 'Obtén premios y certifícate en tus asignaturas favoritas.',
        buttons: {
            discard: false,
            next: {
                label: 'Empezar',
                color: 'primary'
            }
        }
    },
];

export default slides
