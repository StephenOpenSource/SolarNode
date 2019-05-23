import React from 'react';
import './Menu.css';

var expandArr = '\u21c9';
var collapseArr  = '\u21c7';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            arrow: expandArr
        }

        this.onCollapse = this.onCollapse.bind(this);
    }

    componentDidMount() {
        if(this.state.collapsed) {
            document.getElementById('menu-container').classList.add('collapse');
            this.setState({
                arrow: expandArr
            })
        } else {
            document.getElementById('menu-container').classList.remove('collapse');
            this.setState({
                arrow: collapseArr
            })
        }
    }

    onCollapse() {
        document.getElementById("menu-container").classList.toggle("collapse");
        this.setState({
            collapsed: !this.state.collapsed,
            arrow: this.state.collapsed ? collapseArr : expandArr
        });
    }

    render() {
        return (
            <div className="flex-container">
                <div id="menu-container" className="menu-container" onClick={this.onCollapse} onMouseEnter={() => {console.log("Hover menu")}}>
                    This is a {this.props.name} Menu Component
                </div>
                <div>
                    <button className="collapsible menu-button" onClick={this.onCollapse}>{this.state.arrow}</button>
                </div>
            </div>
        );
    }
}

export default Menu;