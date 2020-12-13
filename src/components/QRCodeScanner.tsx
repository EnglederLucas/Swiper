import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Modal } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/Utils";
import SwiperButton from "./SwiperButton";

export default function QRCodeScanner(props: {
  onScanned: (data: any) => void;
}): JSX.Element {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    props.onScanned(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={["qr"]}
        style={[{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }]}
      />
    </View>
  );
}
