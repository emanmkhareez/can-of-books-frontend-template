import React, { Component } from 'react'

export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.updateData}>
                <input defaultValue={this.props.name} type="text" name='name2' />

                <input defaultValue={this.props.description}type="text" name='description2' />

                <select name='status2'>
                    <option></option>
                    <option value='readIt'defaultValue={this.props.status}>read it</option>
                    <option  defaultValue={this.props.status} value='notRead'>not Read</option>
                </select>
                {/* <input placeholder='Enter status' type="text" name='status' /> */}
                <input type="text"  alt="Submit" width="30" height="30" defaultValue={this.props.img} name="img2"></input>
                <input type="submit" value="update" />
            </form> 
            </div>
        )
    }
}

export default UpdateForm
