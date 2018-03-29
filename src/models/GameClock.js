class GameClock {

    constructor(config) {
        if (!config) {
            config = {};
        } else if (!config.selector) {
            console.error("The selector is empty. Please define selector");
            return;
        }
        this.selector = config.selector;
        const selector_ = jQuery(config.selector);
        if (!selector_.length) {
            console.error("The selector is not found. Please use correct selector");
            return;
        }
        this.second = config.second || 0; // second
        this.hour = config.hour || 0; //hour
        this.minute = config.minute; // minute
        this.duration = (this.hour*60*60 + this.minute*60 + this.second)*1000;
        this.minuteStr = this.minute < 10 ? "0" + this.minute : this.minute;
        this.secondStr = this.second < 10 ? "0" + this.second : this.second;
        this.hourStr = this.hour < 10 ? "0" + this.hour : this.hour;
        this.running = false;
        this.timer = 0;
        selector_.append(`
            <div class="container clock-container">
                    <div class="game-clock-timer row justify-content-md-center">
                        <span> ${this.hourStr}:${this.minuteStr}:${this.secondStr}</span>
                    </div>
                    <div class="row justify-content-md-center">
                       <div class="btn-cont">
                            <button type="button" class="btn btn-danger btn-sm">Stop</button>
                            <button type="button" class="btn btn-success btn-sm">Start</button>
                            <button type="button" class="btn btn-outline-info btn-sm">Reset</button>
                        </div>
                    </div>
            </div>
        `);
        selector_.click(this.addEvent.bind(this));
    }

    addEvent(e) {
        if (e.target.className == "btn btn-danger btn-sm") {
            this.stopCount();
        } else if (e.target.className == "btn btn-success btn-sm") {
            this.startCount();
        } else if (e.target.className ==  "btn btn-outline-info btn-sm") {
            this.resetCount();
        }
    }

    startCount() {
        if (this.running) {
            return;
        }
        this.running = true;
        this.startTime = new Date().getTime();
        this.timer = setInterval(() => {
                this.timeDown();
            },
            1000
        );
    }

    resetCount() {
        this.duration = (this.hour*60*60 + this.minute*60 + this.second)*1000;
        this.updateHTML(this.hour, this.minute, this.second);
        this.running = false;
        this.stopCount();
    }

    stopCount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.running) {
            this.running = false;
            this.timeDown();
        }
    }

    updateHTML(hours, minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        hours = hours < 10 ? "0" + hours : hours;
        jQuery(this.selector + ' .game-clock-timer').html(`<span> ${hours}:${minutes}:${seconds}</span>`);
    }

    timeDown() {
        const diff = new Date().getTime() - this.startTime;
        let remainingSeconds = this.duration - diff;
        if (remainingSeconds < 0) {
            remainingSeconds = 0;
            this.running = false;
            this.stopCount(); // stop the clock
        }
        var hours = Math.floor((remainingSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((remainingSeconds % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.round((remainingSeconds % (1000 * 60)) / 1000);
        this.updateHTML(hours, minutes, seconds);
    }
}

export default GameClock;