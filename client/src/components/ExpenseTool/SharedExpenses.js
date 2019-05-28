import React from 'react';
import './SharedExpenses.css';

const API = 'https://sheets.googleapis.com/v4/spreadsheets/1rNINtKsyGC7Gs9hIVpwmmxZvcMin8x2KYFW58mmqGX0/values:batchGet?ranges=Items&majorDimension=ROWS&key=AIzaSyB5fmqbDnEBB5oAsI5M0_RkM_hM2mn9jEI';
const names = {"S": "Stephen", "N": "Nicholas", "J": "Jezzy", "K": "Kelly"};

/**Holds the entirety of the expense data including all headers and rows for the content */
class SharedExpenseContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    componentDidMount() {

        fetch(API).then(response => response.json()).then(data => {
            this.setState({
                /** (-1) removing the header row */
                count: (data.valueRanges[0].values.length - 1)
            });
        });
    }

    render () {
        return (
            <div className="fit-to-parent">
                <h2>Found {this.state.count} Items.</h2>
                <RowHeaderContainer />
                <RowContentContainer/>
            </div>
        )
    }
}

/**Holds all HeaderColumn items */
function RowHeaderContainer(props) {

    return (
        <div className="flex-container-content">
            <div className="simple-border fit-to-parent header-column"><h2>Date</h2></div>
            <div className="simple-border-right fit-to-parent header-column"><h2>Vendor</h2></div>
            <div className="simple-border-right fit-to-parent header-column"><h2>Item</h2></div>
            <div className="simple-border-right fit-to-parent header-column"><h2>Cost</h2></div>
            <div className="simple-border-right fit-to-parent header-column"><h2>Contributors</h2></div>
        </div>
    )
}

/**Holds all RowColumns */
class RowContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: ["0","1","2"],
            items: []
        }
    }

    componentDidMount() {

        fetch(API).then(response => response.json()).then(data => {
            let batchRowValues = data.valueRanges[0].values;

            const rows = [];
            for (let i = 1; i < batchRowValues.length; i++) {
                let rowObject = {};
                for(let j = 0; j < batchRowValues[i].length; j++) {
                    rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                }
                rows.push(rowObject);
            }

            this.setState({
                items: rows
            });
            console.log(this.state.items);
        });
    }

    getData() {
        /**TODO: This is where we would call into Node to get a list of IDs from the Data source */
        let ids = [
            "0","1","2"
        ]
        this.setState({
            ids: ids
        })
    }

    render() {
        const rows = this.state.items.map((item) => 
            <RowColumns key={item.ID} id={item.ID} item={item} />
        );
        
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
            vendor: "None",
            item: "None",
            cost: "0",
            people: "None"
        }
    }

    componentDidMount() {

        console.log("Get Data for RowColumn[" + this.props.id + "].");
        this.setState({
            date: this.props.item.Date,
            vendor: this.props.item.Vendor,
            item: this.props.item.Item,
            cost: this.props.item.Cost,
            people: this.props.item.Split
        });
    }

    getItemByID(id) {
        /**TODO: Call into Node to get the Data from a specified ID */
    }

    render() {

        let people = this.state.people.split('');
        console.log(people);

        const Contributors = people.map((name, index) => 
                <span>{names[name]} </span>
        );
        console.log(Contributors);

        return (
            <div className="flex-container-content">
                {/**TODO: Each div here would be replaced by a DataColumn component that is sent a key to map its data from the DB */}
                <div className="padded fit-to-parent header-column">{this.state.date}</div>
                <div className="padded fit-to-parent header-column">{this.state.vendor}</div>
                <div className="padded fit-to-parent header-column">{this.state.item}</div>
                <div className="padded fit-to-parent header-column">{this.state.cost}</div>
                <div className="padded fit-to-parent header-column">{Contributors}</div>
            </div>
        )
    }
}

export default SharedExpenseContainer;