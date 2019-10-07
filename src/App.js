import React, {Component} from 'react';
import './App.css';
import {post} from 'axios';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './TableStyle.css';

class MyApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            file2: null,
            documentDefinition: []
        };
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChange2 = this.onChange2.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file, this.state.file2).then((response) => {
            console.log(response.data);
            this.setState({documentDefinition: response.data.parts})
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    onChange2(e) {
        this.setState({file2: e.target.files[0]})
    }

    fileUpload(file, file2) {
        const url = '/pit11';
        const formData = new FormData();
        formData.append('pit11', file)
        formData.append('pit112', file2)
        console.log(formData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            <div className="application">

                <div className="field">
                    <form onSubmit={this.onFormSubmit}>
                        <h1>Welcome to Scribe! Please upload first two pages of PIT-11 document.</h1>
                        <input type="file" onChange={this.onChange}/>
                        <input type="file" onChange={this.onChange2}/>

                        <button type="submit">Upload</button>
                    </form>
                </div>

                <Table
                    width={1000}
                    height={300}
                    headerHeight={20}
                    rowHeight={30}
                    rowCount={this.state.documentDefinition.length}
                    rowGetter={({ index }) => this.state.documentDefinition[index]}
                >
                    <Column
                        label='Header'
                        dataKey='input_text'
                        width={300}
                    />
                    <Column
                        label='Matched value'
                        dataKey='matched_value'
                        width={300}
                    />
                    <Column
                        label='Segment preview'
                        dataKey='matched_value'
                        width={300}
                    />
                </Table>

            </div>

        )
    }
}

export default MyApp