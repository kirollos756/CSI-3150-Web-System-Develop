import React, { Component } from 'react';
class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.instructions}
                </td>
                <td>
                    {this.props.obj.ingredients}
                </td>
            </tr>
        );
    }
}
export default DataTable;