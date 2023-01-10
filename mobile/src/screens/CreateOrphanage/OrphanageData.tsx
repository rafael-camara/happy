import { useState } from "react";
import {
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { MapPosition } from "./SelectMapPosition";
import { styles } from "./styles";

LogBox.ignoreLogs(['Key "cancelled"']);

type ImageResult = {
  cancelled?: boolean;
  uri: string;
};

export function OrphanageData() {
  const [imageSelected, setImageSelected] = useState<ImageResult[]>([]);
  const route = useRoute();
  const navigation = useNavigation();

  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const position = route.params as MapPosition;

  function handleCreateOrphanage() {
    // todo
  }

  async function handleSelectImages() {
    const cameraRollStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

    if (
      cameraRollStatus.status !== "granted" ||
      cameraStatus.status !== "granted"
    ) {
      alert("Desculpe, precisamos dessas permissões para fazer este trabalho!");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // allowsEditing: true,
      quality: 1,
    });

    try {
      if (!result.canceled) {
        const images = [
          ...imageSelected,
          ...result.assets.map((asset) => ({ uri: asset.uri })),
        ];
        setImageSelected(images);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleRemoveImage(image: ImageResult) {
    const images = imageSelected;

    setImageSelected(images.filter((img) => img !== image));
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput style={[styles.input, { height: 110 }]} multiline />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Fotos</Text>

      {imageSelected.length > 0 && (
        <>
          {imageSelected.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <View style={styles.imageContent}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <Text style={styles.imageName}>
                  {`imagem_${String(index + 1).padStart(2, "0")}.${image.uri
                    .split(".")
                    .pop()}`}
                </Text>
              </View>

              <BorderlessButton
                style={styles.closeImage}
                onPress={() => handleRemoveImage(image)}
              >
                <Feather name="x" size={24} color="#FF669D" />
              </BorderlessButton>
            </View>
          ))}
        </>
      )}

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput style={[styles.input, { height: 110 }]} multiline />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput style={styles.input} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}
