import React, { Component } from 'react'

class SearchBox extends Component {    

    onSubmit = (e) => {
       e.preventDefault()
    }

    render() {
        const { onChange, value } = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="query" 
                className="form-control mb-3 mt-3"
                placeholder="Search..."
                onChange={e => onChange(e.currentTarget.value)}
                value={value}
                />
            </form>   
        )
    }
}

export default SearchBox;
