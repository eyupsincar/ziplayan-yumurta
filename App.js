import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import Yumurta from "./src/Yumurta";
import Obstacles from "./src/Obstacles";

export default function App() {
    const screenWidth = Dimensions.get("screen").width
    const screenHeight = Dimensions.get("screen").height
    const birdLeft = screenWidth / 2
    const [score, setScore] = useState(0)
    const [birdBottom, setBirdBottom] = useState(screenHeight/2)
    const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
    const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30);
    const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
    const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
    const obstacleWidth = 60;
    const obstacleHeight = 300;
    const gap = 250;
    const gravity = 3;
    let gameTimerId;
    let obstaclesLeftTimerId;
    let obstaclesLeftTimerIdTwo;
    const [isGameOver, setIsGameOver] = useState(false);


    useEffect(() => {
        if (birdBottom > 0) {
            gameTimerId = setInterval(() => {
                setBirdBottom(birdBottom => birdBottom - gravity)
            }, 30)

            return () => {
                clearInterval(gameTimerId)
            }
        }
    }, [birdBottom])


    const jump = () => {
        if (!isGameOver && (birdBottom  < screenHeight)) {
            setBirdBottom(birdBottom => birdBottom + 25)
        }
    }


    // 1. engel  ---------------------------------------------------------------------
    useEffect(() => {
        if (obstaclesLeft > - obstacleWidth) {
            obstaclesLeftTimerId = setInterval(() => {
                setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
            },30)
            return () => {
                clearInterval(obstaclesLeftTimerId)
            }
        } else {
            setObstaclesLeft(screenWidth)
            setObstaclesNegHeight(- Math.random() * 100)
            setScore(score => score + 1)
        }
    },[obstaclesLeft])


    // 2. engel  ---------------------------------------------------------------------
    useEffect(() => {
        if (obstaclesLeftTwo > - obstacleWidth) {
            obstaclesLeftTimerIdTwo = setInterval(() => {
                setObstaclesLeftTwo(setObstaclesLeftTwo => setObstaclesLeftTwo - 5)
            },30)
            return () => {
                clearInterval(obstaclesLeftTimerIdTwo)
            }
        } else {
            setObstaclesLeftTwo(screenWidth)
            setObstaclesNegHeightTwo(- Math.random() * 100)
            setScore(score => score + 1)
        }
    },[obstaclesLeftTwo])


    //-----------------------------------------------------------------------
    useEffect(() => {
        if(
            ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30)  ||
                    birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30 )) &&
                (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
            )
            ||
            ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30)  ||
                    birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30 )) &&
                (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
            )
        )
        {
            gameOver()
        }
    })

    const gameOver = () => {
        clearInterval(gameTimerId)
        clearInterval(obstaclesLeftTimerId)
        clearInterval(obstaclesLeftTimerIdTwo)
        setIsGameOver(true)
    }

    return (
        <TouchableWithoutFeedback onPress={jump}>
            <View style={styles.container}>

                {isGameOver && <Text>Skor: {score}</Text>
                }
                <Yumurta
                    isGameOver={isGameOver}
                    birdBottom={birdBottom}
                    birdLeft={birdLeft}
                />
                <Obstacles
                    obstacleHeight={obstacleHeight}
                    obstacleWidth={obstacleWidth}
                    obstaclesLeft={obstaclesLeft}
                    gap={gap}
                    randomBottom={obstaclesNegHeight}
                />
                <Obstacles
                    obstacleHeight={obstacleHeight}
                    obstacleWidth={obstacleWidth}
                    obstaclesLeft={obstaclesLeftTwo}
                    gap={gap}
                    randomBottom={obstaclesNegHeightTwo}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
