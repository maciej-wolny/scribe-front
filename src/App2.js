import React, {Component} from 'react';
import './App.css';
import {post} from 'axios';
import {Helmet} from 'react-helmet';
import ReactFileReader from 'react-file-reader';
import ImgsViewer from 'react-images-viewer';
import Gallery from "./Gallery";
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

function makeUnsplashSrcSet() {
    return `https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/contour.jpeg`
}

function makeSrcSet(id) {
    var array = []
    array.push(`https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/1.png 500w`)
    return array
}

const theme = {
    // container
    container: {
        background: 'rgba(255, 255, 255, .9)'
    },

    // arrows
    arrow: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        fill: '#222',
        opacity: .6,
        transition: 'opacity 200ms',

        ':hover': {
            opacity: 1,
        }
    },
    arrow__size__medium: {
        borderRadius: 40,
        height: 40,
        marginTop: -20,

        '@media (min-width: 768px)': {
            height: 70,
            padding: 15,
        }
    },
    arrow__direction__left: {marginLeft: 10},
    arrow__direction__right: {marginRight: 10},
    close: {
        fill: '#d40000',
        opacity: .6,
        transition: 'all 200ms',
        ':hover': {
            opacity: 1
        }
    },

    // footer
    footer: {
        color: '#000'
    },
    footerCount: {
        color: 'rgba(0, 0, 0, .6)'
    },

    // thumbnails
    thumbnail: {},
    thumbnail__active: {
        boxShadow: '0 0 0 2px #00d8ff'
    }
};

class MyApp extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            file: null,
            file2: null,
            documentDefinition: []
        }
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

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            alert(reader.result)
        }
        reader.readAsText(files[0]);
    }


    render() {
        const THUMBNAIL_IMAGES = [
            {id: '1', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true},
            {id: '2', caption: 'Photo by Vincentiu Solomon', orientation: 'landscape', useForDemo: true},
            {id: '3', caption: 'Photo by Joshua Earle', orientation: 'landscape', useForDemo: true},
            {id: '4', caption: 'Photo by Leio McLaren', orientation: 'square', useForDemo: true},
            {id: '5', caption: 'Photo by Philipp Kämmerer', orientation: 'square', useForDemo: true},
            {id: '6', caption: 'Photo by Flecher Clay', orientation: 'square'},
            {id: '7', caption: 'Photo by Austin Neil', orientation: 'landscape'},
            {id: '8', caption: 'Photo by Dino Reichmuth', orientation: 'square'},
            {id: '9', caption: 'Photo by Joshua Earle', orientation: 'landscape'},
            {id: '10', caption: 'Photo by Joshua Earle', orientation: 'landscape'},
        ]
        const IMG_SET = [
            {
                src: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                caption: 'A forest',
                // As an array
                srcSet: [
                    'https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/1.png 1024w',
                    'https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/2.png 800w',
                    'https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/3.png 500w',
                    'https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/4.png 500w'
                ]
            },
            {
                src: 'https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/1.png',
                // As a string
                srcSet: 'https://storage.googleapis.com/scribe-segments/Pit-11-2550196509151003157/2.png 320w',
            }
        ]
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
                <h3>With Thumbnails</h3>
                <Table
                    width={300}
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
                        dataKey='input_text'
                        width={300}
                    />
                    <Column
                        label='Name'
                        dataKey='input_text'
                        width={300}
                    />
                </Table>
                <Gallery
                    theme={theme}

                    imgs={this.state.documentDefinition.map(({input_text, filePath}) => ({
                        src: filePath,
                        thumbnail: filePath,
                        srcSet:
                            [filePath],
                        caption: input_text,
                        orientation: 'square',
                        useForDemo: true,
                    }))}
                    showThumbnails
                />

            </div>
        )
    }
}

export default MyApp