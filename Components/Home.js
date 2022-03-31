import { FlatList, ScrollView, StatusBar, TouchableOpacity, VirtualizedList } from 'react-native';
import React, { Component, useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import CustomBackground from './Custom_Background_Bottom_Sheet';
import CustomBackdrop from './Backdrop_Bttom_Sheet'

import {BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';



export default function Home({navigation}) {

  const [music, setMusic] = useState([
    { cím: 'Episode 1', kép:require("../assets/1.jpg"), key: '1'},
    { cím: 'Episode 2', kép:require("../assets/2.jpg"), key: '2'},
    { cím: 'Episode 3', kép:require("../assets/3.jpg"), key: '3'},
    { cím: 'Episode 4', kép:require("../assets/4.jpg"), key: '4'},
    { cím: 'Episode 5', kép:require("../assets/4.jpg"), key: '5'},
    { cím: 'Episode 6', kép:require("../assets/4.jpg"), key: '6'},
    { cím: 'Episode 7', kép:require("../assets/4.jpg"), key: '7'},
    { cím: 'Episode 8', kép:require("../assets/4.jpg"), key: '8'},
    { cím: 'Episode 9', kép:require("../assets/4.jpg"), key: '9'},
    { cím: 'Episode 10', kép:require("../assets/4.jpg"), key: '10'},
    { cím: 'Episode 11', kép:require("../assets/4.jpg"), key: '11'},
  ]);




  const [isPlaying, setisPlaying] = useState(false)
  const [zene_hossz, setZene_hossz] = useState('')
  const [slider_value, setSlider_value] = useState(0)
  const [sound, setSound] = useState();
  const [manual_tekeres, setmanual_tekeres] = useState(false)

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/music/zene.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');

    
    const song_status = await sound.playAsync();
    setisPlaying(true)
  }

  useEffect(() => {
    return sound
      ? () => {
          //console.log(sound);
          console.log('Unloading Sound');
          setisPlaying(false)
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  

  useEffect(() => {
    if(isPlaying == true) {
      sound.getStatusAsync()
      .then(function(result) {
        console.log("zene_Százaléka",result.positionMillis/result.durationMillis*100)
        
        if(manual_tekeres==false){
          var timeout = setTimeout(
            () => {
              setSlider_value(result.positionMillis/result.durationMillis*100)
            }, 1000);
          } else {
          setSlider_value(result.positionMillis/result.durationMillis*100)
        }
      })
    }
    if (isPlaying == false) {
    
    }
    setmanual_tekeres(false)
  }, [isPlaying, slider_value])

  

  const handleSheetChanges = useCallback((index) => {
    console.log( index);
    if (index == -1) {
      sound.pauseAsync()
      setisPlaying(false)
    }
  },);

  function zene_beállítása(value) {
    sound.getStatusAsync()
        .then(function(result) {
          sound.playFromPositionAsync(result.durationMillis*Math.floor(value)/100)
          
          let szamhossz_másodpercben = result.durationMillis/1000
          let zene_egy_szazaleka = szamhossz_másodpercben/100
          
          if(isPlaying==false){
            sound.pauseAsync()
          }
          setmanual_tekeres(true)
        })
  }

  // function zene_hossz_megállípítás() {
  //   sound.getStatusAsync()
  //       .then(function(result) {
  //         console.log(result.durationMillis)
  //       })
  //         // function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
  //         // setZene_hossz(fmtMSS(result.durationMillis)/1000)
  //         // setZene_hossz(result.durationMillis/1000)
  // }
  //zene_hossz_megállípítás()
  
 async function zene_play_pause_toggle() {
   if (isPlaying === true) {
     sound.pauseAsync()
     
     sound.getStatusAsync().then(function(result) {console.log(result.positionMillis)})
     setisPlaying(false)
     
     console.log("paused")
   } if (isPlaying === false) {
     sound.playAsync()
     setisPlaying(true)

     console.log("played")
   }
 }

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['89.2%'], []);



  const openModal = () => {
    bottomSheetModalRef.current.present()
  }


  const openModal_and_playSound = () =>{
    setSlider_value(0)
    openModal();
    playSound()
  }

  

        return (
      
      <View style={styles.fo_container}>
      <BottomSheetModalProvider>
      <View style={styles.navbar}>
          <Svg xmlns="http://www.w3.org/2000/svg" width={22.8} height={24}>
          <Path
            d="M7.972 22.538v-3.68a1.7 1.7 0 011.7-1.7h3.449a1.7 1.7 0 011.708 1.7v3.67A1.477 1.477 0 0016.3 24h2.353a4.152 4.152 0 002.932-1.2 4.092 4.092 0 001.215-2.907V9.439a2.967 2.967 0 00-1.074-2.283L13.732.809a3.738 3.738 0 00-4.749.085L1.16 7.156A2.969 2.969 0 000 9.439v10.443A4.133 4.133 0 004.147 24h2.3a1.478 1.478 0 001.048-.424 1.456 1.456 0 00.435-1.037z"
            fill="#130f26"
          />
        </Svg>
        <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} onPress={() => navigation.navigate("Search")}>
          <Path
            d="M23.707 22.328l-4.125-4.033-.1-.147a.972.972 0 00-1.364 0 9.735 9.735 0 01-12.618.408A9.215 9.215 0 013.451 6.372a9.691 9.691 0 0112.092-3.561 9.29 9.29 0 015.177 11.262.935.935 0 00.218.926.986.986 0 00.929.278.963.963 0 00.711-.648 11.2 11.2 0 00-6-13.5A11.7 11.7 0 002.027 4.9a11.107 11.107 0 001.632 14.635 11.747 11.747 0 0015.042.618l3.652 3.571a.982.982 0 001.364 0 .941.941 0 000-1.344z"
            fill="#130f26"
          />
        </Svg>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={25.263}
          height={24}>
          <Path
            d="M19.6.382a7.842 7.842 0 014.7 4.031 9.979 9.979 0 01.424 7.528 15.813 15.813 0 01-3.745 6.018 30.146 30.146 0 01-3.555 3.123l-.067.057a.914.914 0 01-1.271-.25.944.944 0 01-.162-.707.933.933 0 01.385-.611 29.477 29.477 0 003.344-2.941 13.827 13.827 0 003.344-5.28 8.015 8.015 0 00-.379-6.063 6.038 6.038 0 00-3.6-3.088 6.369 6.369 0 00-5.829 1.033.922.922 0 01-1.114 0A6.358 6.358 0 006.241 2.2a6.036 6.036 0 00-3.633 3.076 8.085 8.085 0 00-.357 6.041A13.871 13.871 0 005.6 16.585a41.732 41.732 0 007.267 5.677.964.964 0 01.363 1.058.939.939 0 01-.876.679.891.891 0 01-.513-.159 43.333 43.333 0 01-7.568-5.916 15.618 15.618 0 01-3.756-6.018 10.036 10.036 0 01.468-7.494A7.842 7.842 0 015.673.382a8.293 8.293 0 016.966.931A8.293 8.293 0 0119.6.382zm-.914 8.7a2.491 2.491 0 00-1.716-2.271.963.963 0 01-.389-1.111.937.937 0 01.962-.653 4.378 4.378 0 013 3.8.944.944 0 01-.187.693.91.91 0 01-.616.351.939.939 0 01-1.049-.811z"
            fill="#130f26"
            fillRule="evenodd"
          />
        </Svg>
        <Svg xmlns="http://www.w3.org/2000/svg" width={19.2} height={24}>
          <Path
            d="M4.87 6.425a4.73 4.73 0 114.73 4.7 4.72 4.72 0 01-4.73-4.7zm-1.735 0A6.465 6.465 0 109.6 0a6.452 6.452 0 00-6.465 6.425zm5.238 17.557Q8.973 24 9.6 24c4.121 0 9.6-.457 9.6-4.4 0-4.429-7.226-4.429-9.6-4.429-4.121 0-9.6.457-9.6 4.405 0 1.182.553 2.777 3.188 3.663a.866.866 0 10.557-1.639c-1.8-.607-2.011-1.451-2.011-2.033 0-1.78 2.647-2.682 7.866-2.682s7.866.911 7.866 2.706c0 1.778-2.647 2.679-7.866 2.679q-.6 0-1.177-.016a.885.885 0 00-.89.836.861.861 0 00.84.892z"
            fill="#130f26"
            fillRule="evenodd"
          />
        </Svg>
      </View>
      <StatusBar backgroundColor={'#130F26'} barStyle={'light-content'}/>

      <View style={styles.fejlec_container}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={20}>
        <Path
          d="M0 2.222A2.044 2.044 0 011.777 0h7.11v2.222h-7.11v15.556h7.11V20h-7.11A2.044 2.044 0 010 17.778zm12.6 6.667l-2.256-2.818L11.6 4.5 16 10l-4.4 5.5-1.257-1.571 2.257-2.818H6.745V8.889z"
          fill="#f3f3f3"
          fillRule="evenodd"/>
      </Svg>

        <Image source={require('../assets/logo.png')} style={styles.logo}></Image>

        <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16.002}
        height={20}>
        <Path
          d="M11.085 2.853A2.5 2.5 0 1113.657 6 5.99 5.99 0 0114 8v6h1a1 1 0 010 2h-4v1a3 3 0 01-6 0v-1H1a1 1 0 010-2h1V8a6 6 0 015-5.917V1a1 1 0 012 0v1.083a5.961 5.961 0 012.085.77zM8 18a1 1 0 001-1v-1H7v1a1 1 0 001 1zm-4-4h8V8a4 4 0 00-8 0z"
          fill="#f3f3f3"
          fillRule="evenodd"
        />
      </Svg>
      </View>


      <ScrollView>
      <View style={{marginBottom:85, paddingTop:20,flex:0}}>
      <View style={styles.live_container}>
        <View style={styles.red_live}>
          <View style={{backgroundColor: '#D53A3A', borderRadius: 10, zIndex: 3, width:13, height:13, marginRight: 3}}></View>
          <Text style={{color: '#D53A3A', fontWeight: 'bold', fontSize: 11}}>Live</Text>
        </View>
        <View style={styles.live_whitebox}>
          <View /*bal oldali rész*/style={{height: 143, justifyContent: 'space-around'}}>
            <View>
              <Text style={{marginLeft: 18, marginTop:17, fontSize: 16, fontFamily: 'Poppins_400Regular'}}>Nightlifemusic Radio Show</Text>
              <Text style={{marginLeft: 18, fontFamily: 'Poppins_400Regular'}}>Episode #34</Text>
            </View>
            <TouchableOpacity><View style={{width:104, height:33, backgroundColor: '#000000', borderRadius:20, alignItems: 'center', justifyContent: 'center', marginBottom: 13, marginLeft:18}}><Text style={{color:'#fff', fontFamily: 'Poppins_400Regular', marginBottom:-3}}>Join</Text></View></TouchableOpacity>
          </View>
          <View /* jobb oldali rész*/ style={{position: 'absolute'}}>
            <Image source={require('../assets/fejhallgato.png')} style={{marginTop: -20, marginLeft:179}}></Image>
          </View>
        </View>
      </View>

      <Text style={{marginLeft:'12%', marginTop:42, color:'#fff', fontSize:21, fontFamily: 'Poppins_500Medium'}}>Korábbi Epizódok</Text>
      
      <View /* zene lista*/style={{marginTop:16, alignItems:'center', flex:1}}>
          <FlatList
            data={music}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => openModal_and_playSound()}>
              <View /* zene doboz*/style={styles.zene_doboz} >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={item.kép} style={{width:50,height:50,borderRadius:50, marginRight:22}}></Image>
                  <View /* középső rész*/>
                    <Text style={{color:'#fff', fontSize:16, fontFamily: 'Poppins_400Regular'}}>{item.cím}</Text>
                    <Text style={{color:'#fff', fontSize:9, fontFamily: 'Poppins_400Regular'}}>2020.05.19</Text>
                  </View>
              </View>
              <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={34}>
                <Path
                d="M23.859 13.52a4 4 0 010 6.96L5.972 30.616A4 4 0 010 27.136V6.864a4 4 0 015.972-3.48z"
                fill="#fff"
                />
              </Svg>
          </View>
          </TouchableOpacity>
            )}
          />
          
      </View>
      </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheetContainer}
        backgroundComponent={CustomBackground}
        backdropComponent={CustomBackdrop}
        onChange={handleSheetChanges}
        // style={{zIndex: 20}}
      >
          <View style={styles.bottomsheet_content}>
            <Image source={require('../assets/4.jpg')} style={{width:280, height:280, borderRadius:20}}></Image>
            <Text style={{fontSize:16, fontFamily:'Poppins_400Regular', marginTop:25, fontWeight:'bold'}}>Zene Title</Text>
            
            <View /* media controlls*/ style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:200, paddingTop:40}}>
              
              <TouchableOpacity onPress={() => {}}>
                <Image source={require('../assets/skip.png')} style={{width:22,height:22}}></Image>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {zene_play_pause_toggle()}}>
                {isPlaying ? <Image source={require('../assets/pause.png')} style={{width:47,height:47}}></Image> : <Image source={require('../assets/play.png')} style={{width:47,height:47}}></Image>}
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={require('../assets/skip.png')} style={{width:22,height:22,}}></Image>
              </TouchableOpacity>

            </View>
            <Slider
                style={{width: 340, height: 1, paddingTop:100}}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#130F26"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor='#130F26'
                value={slider_value}
                onSlidingComplete={() => {}}
                onValueChange={value => {zene_beállítása(value)}}
              />
            <View style={{flexDirection:'row', marginTop:-35, justifyContent:'space-between', width:320}}>
              <Text>0:00</Text>
              <Text>{zene_hossz}</Text>
            </View>
          </View>
       </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
    
        )
    }

const styles = StyleSheet.create({
    fo_container: {
      backgroundColor: '#130F26',
      //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1
    },
    fejlec_container: {
      backgroundColor: '#130F26',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 30,
      marginRight: 30,
      marginTop: -15,
      marginBottom:-20,
    },
    logo: {
      width:120,
      height:120,
    },
  
    live_container: {
      alignItems: 'center',
      zIndex:1
    },
    live_whitebox: {
      width: 338,
      height: 143,
      backgroundColor: '#f3f3f3',
      borderRadius: 20,
      zIndex: 1,
      flexDirection: 'row',
      overflow: 'hidden'
    },
    red_live:{
      width: 85,
      height: 26,
      backgroundColor: "#FFFFFF",
      borderWidth: 1.5,
      borderColor: '#D53A3A',
      borderRadius: 10,
      marginBottom: -13,
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    navbar:{
      position: 'absolute',
      zIndex:1,
      bottom:0,
      width:'100%',
      height:70,
      backgroundColor:'#f3f3f3',
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight:42,
      paddingLeft:42
    },
    zene_doboz:{
      width:338,
      height:86,
      backgroundColor: '#221E35',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft:17,
      paddingRight:24,
      marginBottom:20
    },
    bottomSheetContainer:{
      backgroundColor: '#130F26',
      borderRadius: 1000,
      flex:1,
    },
    bottomsheet_content:{
      alignItems:'center',
      justifyContent: 'flex-start',
      flex:1,
      marginHorizontal: 80,
      marginTop:40
    }
  });
