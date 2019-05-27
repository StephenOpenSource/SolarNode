import React from 'react';
import './SharedExpenses.css';

/**Holds the entirety of the expense data including all headers and rows for the content */
class SharedExpenseContainer extends React.Component {

    render () {
        return (
            <div className="fit-to-parent">
                <h2>This is a {this.props.name} Shared Expense Container.</h2>
                <RowHeaderContainer />
                <RowContentContainer rows="5"/>
            </div>
        )
    }
}

/**Holds all HeaderColumn items */
function RowHeaderContainer(props) {

    return (
        <div className="flex-container">
            <div className="simple-border padded fit-to-parent header-column">Date</div>
            <div className="simple-border-right padded fit-to-parent header-column">Store</div>
            <div className="simple-border-right padded fit-to-parent header-column">Item</div>
            <div className="simple-border-right padded fit-to-parent header-column">Cost</div>
            <div className="simple-border-right padded fit-to-parent header-column">Contributors</div>
        </div>
    )
}

/**Holds all RowColumns */
class RowContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: ["0","1","2"]
        }
    }

    getData() {
        /**TODO: This is where we would call into Node to get a list of IDs from the Data source */
        this.setState({
            ids: ["0","1","2"]
        })
    }

    render() {
        let rows = [];
        for(var i = 0; i < this.state.ids.length; i++) {
            rows[i] = <RowColumns key={this.state.ids[i]} id={this.state.ids[i]} />
        }
        
        return(
            <div className="fit-to-parent">
                {rows}
            </div>
        )
    }
}

/**Contains all columns in a specific Row for a single DataColumn item */
class RowColumns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "None",
            store: "None",
            item: "None",
            cost: "0",
            people: "None"
        }
    }

    componentDidMount() {
        
        console.log("Get Data for RowColumn[" + this.props.id + "].");
        if(this.props.id) {
            this.getItemByID(this.props.id);
        }
    }

    getItemByID(id) {
        /**TODO: Call into Node to get the Data from a specified ID */

        let data = {
            "0": {
                "date": "Jan 15th 2019",
                "store": "Costco",
                "item": "Steak",
                "cost": "$45.21",
                "people": "Stephen/Nick/Jezzy"
            },
            "1": {
                "date": "Feb 2nd 2019",
                "store": "Safeway",
                "item": "Bread",
                "cost": "$3.84",
                "people": "Stephen/Nick/Jezzy"
            },
            "2": {
                "date": "Feb 2th 2019",
                "store": "Safeway",
                "item": "Cheese",
                "cost": "$7.89",
                "people": "Stephen/Nick/Jezzy"
            }
        }

        
        this.setState({
            date: data[id].date,
            store: data[id].store,
            item: data[id].item,
            cost: data[id].cost,
            people: data[id].people
        });
    }

    render() {

        return (
            <div className="flex-container">
                {/**TODO: Each div here would be replaced by a DataColumn component that is sent a key to map its data from the DB */}
                <div className="padded fit-to-parent header-column">{this.state.date}</div>
                <div className="padded fit-to-parent header-column">{this.state.store}</div>
                <div className="padded fit-to-parent header-column">{this.state.item}</div>
                <div className="padded fit-to-parent header-column">{this.state.cost}</div>
                <div className="padded fit-to-parent header-column">{this.state.people}</div>
            </div>
        )
    }
}

export default SharedExpenseContainer;