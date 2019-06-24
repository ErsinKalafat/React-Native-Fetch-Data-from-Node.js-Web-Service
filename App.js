import React, {Component} from 'react';
import {Modal, Image, ScrollView, Text, TouchableOpacity, View, TouchableHighlight, StyleSheet} from 'react-native';
import axios from 'axios';
import Header from './Header.js';


export default class App extends Component {

    state = {
        data: [],
        goster: false
    };

    componentWillMount() {
        axios.get('http://192.168.43.127:1337/TumHaberler')
            .then(response => {
                this.setState({data: response.data});
            });
    }

    componentDidMount(): void {
    }

    renderData() {
        const {containerStyle, subContainerStyle, imageStyle} = styles;
        const {butonTasarimi, textTasarimi, kapatButonu} = styles;

        return (this.state.data.map((responseData, Id) =>

            <View key={Id} style={containerStyle}>
                <View style={subContainerStyle}>
                    <Text>{responseData.baslik}</Text>
                </View>

                <View style={subContainerStyle}>
                    <Image style={imageStyle} source={{uri: responseData.resim_adi}}/>
                </View>


                <View key={Id} style={subContainerStyle}>
                    <TouchableOpacity style={butonTasarimi}
                                      onPress={() => {
                                          this.setState({goster: true})
                                      }}>
                        <Text style={textTasarimi}>İncele</Text>
                    </TouchableOpacity>

                    <View key={Id}>
                        <Modal visible={this.state.goster}>
                            <View>
                                <View style={subContainerStyle}>
                                    <Text>{responseData.baslik}</Text>
                                </View>

                                <View style={subContainerStyle}>
                                    <Image style={imageStyle} source={{uri: responseData.resim_adi}}/>
                                </View>

                                <Text>{responseData.icerik}</Text>

                                <TouchableOpacity onPress={() => {
                                    this.setState({goster: false})
                                }}>
                                    <Text style={kapatButonu}>Kapat</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>

                </View>

            </View>
        ))
    }

    render() {
        return (
            <ScrollView style={{flex: 1, paddingTop: 20}}>

                <Header/>
                <View style={{flex: 1, paddingBottom: 30}}>
                    {this.renderData()}
                </View>

            </ScrollView>
        );

    }
}


const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    kapatButonu: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: '#7a100b',
        padding: 10
    },
    subContainerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    },
    imageStyle: {
        height: 200,
        flex: 1,
    },
    textTasarimi: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    butonTasarimi: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#3c7a5f',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#3c7a5f',
        marginLeft: 1,
        marginRight: 1
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});