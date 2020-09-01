import React from  'react'
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

class SearchParameters extends React.Component {

    handleTypeAheadChange = (selectedItem) => {
        let items = selectedItem.map((item) => {
            if (typeof item.name !== 'undefined')
                return item.name;
            return item;
        });
        const value = items.join(',');
        if(value.length>0){
            this.updateParentValue(value);
        }
    };

    updateParentValue = (value) => {
        this.props.onSelect(value);
    };

    render() {
        let defaultValue =[this.props.Options[0]];
        return (
            <div>
                <Typeahead
                    className="oauth-macro-typeahead"
                    // onInputChange={(selectedItems) => this.handleTypeAheadChange(selectedItems)}
                    // renderMenuItemChildren={this.renderMenu}
                    labelKey="name"
                    options={this.props.Options}
                    selected={defaultValue}
                    placeholder="Choose a parameters..."
                    onChange={(selectedItems) => this.handleTypeAheadChange(selectedItems)}
                    disabled={false}
                />
            </div>
        );
    }

}
export default  SearchParameters;
