import { LinkingOptions } from '@react-navigation/native'

import { RootStackParamList } from '../modules/module/RootStack'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['/'],
  config: {
    screens: {
      OrphanagesMap: 'orphanages-map',
      SelectMapPosition: 'select-map-position',
      OrphanageData: 'orphanage-data',
      OrphanageDetails: 'orphanage-details'
    },
  },
}

export default linking