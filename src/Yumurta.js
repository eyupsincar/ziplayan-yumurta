import React from "react";
import {View, Image} from "react-native";
import Images from "../constants/Images";

const Yumurta = ({birdBottom, birdLeft, isGameOver}) => {
    const birdWidth = 50;
    const birHeight = 60;
    return (
        <Image
            style={{
                position: "absolute",
                width: birdWidth,
                height: birHeight,
                left: birdLeft - (birdWidth / 2),
                bottom: birdBottom,
            }}
            source={isGameOver ? Images.egg2 : Images.egg}/>
    )
}

export default Yumurta;
