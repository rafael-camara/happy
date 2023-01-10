import { StackScreenProps } from "@react-navigation/stack";
import { MapPosition } from "../../screens/CreateOrphanage/SelectMapPosition";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  OrphanagesMap: undefined;
  SelectMapPosition: undefined;
  OrphanageData: MapPosition;
  OrphanageDetails: undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;