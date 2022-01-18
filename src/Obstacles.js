import React from "react";
import {Image} from "react-native";
import Images from "../constants/Images";

const Obstacles = ({ obstaclesLeft, obstacleHeight, obstacleWidth, gap, randomBottom}) => {
    return (
        <>
            <Image
                style={{
                    position: 'absolute',
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstaclesLeft,
                    bottom: randomBottom + obstacleHeight + gap,
                }}
                source={Images.boruAsagi} />
            <Image
                style={{
                    position: 'absolute',
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstaclesLeft,
                    bottom: randomBottom,
                }}
                source={Images.boruYukari} />
        </>
    )
}

export default Obstacles;
