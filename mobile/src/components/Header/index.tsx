import { Feather } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { StackHeaderProps } from "@react-navigation/stack";

interface HeaderProps extends StackHeaderProps {
  showCancel?: boolean;
  title: string;
}

import { styles } from "./styles";

export function Header({ showCancel = true, title, navigation }: HeaderProps) {
  function handleCancelCreateOrphanage() {
    navigation.navigate("OrphanagesMap");
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15B6D6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleCancelCreateOrphanage}>
          <Feather name="x" size={24} color="#FF669D" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}
