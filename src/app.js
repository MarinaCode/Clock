import './styles/main.css';
import GameClock from './models/GameClock';

(() => {
    const clock1 = new GameClock({
        selector: '#clock1',
        hour: 0,
        minute: 20,
        second: 0
    });

    const clock2 = new GameClock({
        selector: '#clock2',
        hour: 0,
        minute: 20,
        second: 0
    });

    const clock3 = new GameClock({
        selector: '#clock3',
        hour: 0,
        minute: 20,
        second: 0
    });

    const clock4 = new GameClock({
        selector: '#clock4',
        hour: 0,
        minute: 20,
        second: 0
    });

})()