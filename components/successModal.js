import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CreateAccountStyles';

const SuccessModal =({ close, label= 'Joint Account successfully created' }) => {

   return( <View style={styles.successModalContainer}>
      <View>
        <View style={styles.contentContainer}>
          <Icon
            name='md-checkmark-circle'
            size={25}
            color='green'          />
          <View style={styles.spacedPadding}>
            <Text style={styles.actionText}>Success</Text>
            <Text style={styles.regularBaseFonted}>
              {label}
            </Text>
          </View>
          <Icon
            name='md-close'
            size={25}
            onPress={close}
          />
        </View>
      </View>
    </View>
);
   }

export default SuccessModal;