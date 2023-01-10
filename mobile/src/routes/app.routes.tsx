import { createStackNavigator } from "@react-navigation/stack";

import { OrphanagesMap } from "../screens/OrphanagesMap";
import { SelectMapPosition } from "../screens/CreateOrphanage/SelectMapPosition";
import { OrphanageData } from "../screens/CreateOrphanage/OrphanageData";
import { OrphanageDetails } from "../screens/OrphanageDetails";
import { Header } from "../components/Header";

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#F2F3F5" },
      }}
    >
      <Stack.Screen name="OrphanagesMap" component={OrphanagesMap} />
      <Stack.Screen
        name="SelectMapPosition"
        component={SelectMapPosition}
        options={{
          headerShown: true,
          header: (props) => <Header title="Selecione no mapa" {...props} />,
        }}
      />
      <Stack.Screen
        name="OrphanageData"
        component={OrphanageData}
        options={{
          headerShown: true,
          header: (props) => <Header title="Dados do orfanato" {...props} />,
        }}
      />
      <Stack.Screen
        name="OrphanageDetails"
        component={OrphanageDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <Header title="Orfanato" showCancel={false} {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
