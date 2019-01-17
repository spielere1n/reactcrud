import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangeGSTNumber = this.onChangeGSTNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            person_name: '',
            business_name: '',
            business_gst_number: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/business/edit/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    person_name: res.data.person_name,
                    business_name: res.data.business_name,
                    business_gst_number: res.data.business_gst_number
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChangePersonName(e) {
        this.setState ({
            person_name: e.target.value
        });
    }

    onChangeBusinessName(e) {
        this.setState ({
            business_name: e.target.value
        });
    }

    onChangeGSTNumber(e) {
        this.setState ({
            business_gst_number: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            person_name: this.state.person_name,
            business_name: this.state.business_name,
            business_gst_number: this.state.business_gst_number
        };
        axios.post('http://localhost:4000/business/add', obj)
            .then(res => console.log(res.data));

        this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update Business</h3>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Person Name: </label>
                        <input type="text" className="form-control" value={this.state.person_name} onChange={this.onChangePersonName} />
                    </div>
                    <div className="form-group">
                    <label>Add Business Name: </label>
                        <input type="text" className="form-control" value={this.state.business_name} onChange={this.onChangeBusinessName} />
                    </div>
                    <div className="form-group">
                    <label>Add GST Number: </label>
                        <input type="text" className="form-control" value={this.state.business_gst_number} onChange={this.onChangeGSTNumber} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Business" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}