import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather"

const API_KEY = "a6b08dd32e54c8ff262eb9c1ff47f430";

export default class App extends Component {

  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position =>{      // 위치정보를 가져오기
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error =>{
        this.setState({
          error: error
        });
      }
    );
  }

  _getWeather(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        })
        console.log(this.state)
      })
  }

  render() {
    const {isLoaded,error} = this.state;

    return (
      <View style={styles.container}>
        < StatusBar hidden = {true} / >
        {isLoaded ? (< Weather />) : (
         <View style= {styles.loading}>
           <Text style= {styles.loadingText}>Getting the Fucking Wether</Text>
           {error ? <Text style = {styles.errorText}>{error}</Text> : null}
         </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading:{
    flex:1,
    backgroundColor:'#FDF6AA',
    justifyContent:'flex-end',
    paddingLeft: 24
  },
  loadingText:{
    fontSize:38,
    marginBottom: 24
  }

});
