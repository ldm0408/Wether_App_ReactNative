import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather"

export default class App extends Component {

  state = {
    isLoaded: false,
    error: null
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position =>{      // 위치정보를 가져오기
        this.setState({
          isLoaded: true // 위치 정보가 있는게 확인 되면 스테이트 변경
        });
      },
      error =>{
        this.setState({
          error: error
        });
      }
    );
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
