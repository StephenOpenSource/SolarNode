import React from 'react';
import './Clock.css';

class Clock extends React.Component {
    state = {
        date: new Date()
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="clock-std">
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

export default Clock;