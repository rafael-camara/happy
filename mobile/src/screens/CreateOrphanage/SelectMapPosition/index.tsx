import { useState } from "react";
import { View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../../images/map-marker.png";
import { styles } from "./styles";

export interface MapPosition {
  latitude: number;
  longitude: number;
}

export function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleSelectMapPosition(event: MapPressEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate("OrphanageData", position);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -12.137059381441068,
          longitude: -45.007641613483436,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
      >
        {!!position.latitude && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </MapView>

      {!!position.latitude && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}
