import React, { Component } from "react"
import Swiper from "react-native-deck-swiper"
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import ImageCard from "./ImageCard"
import { globalVariables } from "../GlobalStyles"
import IconButton from "../components/IconButton"

const oldDemoCards: { title: string; source: ImageSourcePropType }[] = [
  {
    title: "Star Wars",
    source: {
      uri:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7uJYadq29ZfZojh8YycsvQbY9y5.jpg",
    },
  },
  {
    title: "Teenage Bounty Hunters",
    source: {
      uri: "https://image.tmdb.org/t/p/w1280/gFtJaWcLAJJsSzfuWcLSeAS8aVl.jpg",
    },
  },
  {
    title: "Titanic",
    source: {
      uri: "https://image.tmdb.org/t/p/w1280/AsvlvNiSmCYDWuedlAAVRzNDzPv.jpg",
    },
  },
]

const demoCards: {
  title: string
  description?: string
  source: ImageSourcePropType
}[] = [
  {
    title: "Ranzler",
    description: "Schau mi an und Schau di an",
    source: {
      uri: "https://i.gyazo.com/8ee7f571367d9908283daa5854fadf63.jpg",
    },
  },
  {
    title: "Da Wirth",
    source: {
      uri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ10O6iFJr8WwFxj-RsWgYxWxY9WQOxS6UsVA&usqp=CAU",
    },
  },
  {
    title: "Janus",
    source: {
      uri: "https://i.gyazo.com/ed2724cf2e7fd5f9140598b30cda84ae.jpg",
    },
  },
  {
    title: "Kevin",
    source: {
      uri: "https://i.gyazo.com/5ab9ad7c8536d55ad3caf981086826d9.jpg",
    },
  },
  {
    title: "Bernhard Lehner",
    description: "This guy fucks!",
    source: {
      uri: "https://i.gyazo.com/3a5d7fa4e52cec3502f148ba84cc1ad4.png",
    },
  },
  {
    title: "Daniel uWu",
    source: {
      uri: "https://i.gyazo.com/b1a8c8cf7ad6f1e24795439ca33e7d58.png",
    },
  },
  {
    title: "Lux",
    source: {
      uri:
        "https://i.pinimg.com/originals/3c/eb/23/3ceb23b8b41e8887289ac7c2d4bcb9a9.png",
    },
  },
  {
    title: "Hofmarcher",
    source: {
      uri:
        "https://nothalfgood.files.wordpress.com/2018/07/fly-rubbing-hands-e1531413955790.jpg?w=426",
    },
  },
  {
    title: "Chad",
    description: "Alles Gute zum Geburtstag, Alex!",
    source: {
      uri: "https://i.gyazo.com/48014a203e13dd774064bc1cdf10e944.png",
    },
  },
]

export default class SwipePremade extends Component {
  swiper: Swiper<any> | null
  constructor(props) {
    super(props)
    this.state = {
      cards: demoCards,
      swipedAllCards: false,
      swipeDirection: "",
      cardIndex: 0,
    }
  }

  renderCard = (
    card: { title: string; description?: string; source: ImageSourcePropType },
    index: any
  ): JSX.Element => {
    return (
      <View style={styles.card}>
        <ImageCard
          style={{ height: "100%" }}
          source={card.source}
          title={card.title}
          description={card.description}
        ></ImageCard>
      </View>
    )
  }

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    })
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <View style={styles.swipeContainer}>
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper
            }}
            containerStyle={{
              backgroundColor: globalVariables.darkBackground2,
            }}
            // onSwiped={() => this.onSwiped("general")}
            onSwipedLeft={() => this.onSwiped("left")}
            onSwipedRight={() => this.onSwiped("right")}
            onSwipedTop={() => this.onSwiped("top")}
            // onSwipedBottom={() => this.onSwiped("bottom")}
            // onTapCard={() => console.log("Hejo")}
            cards={this.state.cards}
            // horizontalThreshold={}
            cardIndex={this.state.cardIndex}
            cardVerticalMargin={100}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            stackSize={3}
            stackSeparation={0}
            overlayLabels={{
              bottom: {
                title: "BLEAH",
                style: {
                  label: {
                    borderColor: "white",
                    color: "white",
                    padding: 20,
                    backgroundColor: "rgba(255,255,255,0.8)",
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              },
              left: {
                title: "NOPE",
                style: {
                  label: {
                    borderColor: "white",
                    color: "white",
                    padding: 20,
                    backgroundColor: "rgba(255,255,255,0.8)",
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: "LIKE",
                style: {
                  label: {
                    borderColor: "white",
                    color: "white",
                    padding: 20,
                    backgroundColor: "rgba(255,255,255,0.8)",
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
              top: {
                title: "SUPER LIKE",
                style: {
                  label: {
                    borderColor: "white",
                    color: "white",
                    padding: 20,
                    backgroundColor: "rgba(255,255,255,0.8)",
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          ></Swiper>
        </View>
        <View style={styles.buttonBar}>
          <IconButton
            size={60}
            style={{ margin: 15 }}
            icon={require("./../assets/iconsPng/Icons/NoCross.png")}
            onClick={() => this.swiper?.swipeLeft()}
          ></IconButton>
          <IconButton
            size={45}
            iconFactor={0.5}
            iconStyle={{ marginBottom: 2 }}
            icon={require("./../assets/iconsPng/Icons/Star.png")}
            onClick={() => this.swiper?.swipeTop()}
          ></IconButton>
          <IconButton
            size={60}
            style={{ margin: 15 }}
            iconFactor={0.45}
            icon={require("./../assets/iconsPng/Icons/Heart.png")}
            iconStyle={{ marginTop: 3 }}
            onClick={() => this.swiper?.swipeRight()}
          ></IconButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalVariables.darkBackground2,
  },
  swipeContainer: {
    height: "92%",
    marginBottom: 10,
  },
  buttonBar: {
    height: "5%",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
})
