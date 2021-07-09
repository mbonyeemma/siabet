import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import SuccessModal from './successModal';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View >
      <Button title="Show modal" onPress={toggleModal} />

      <Modal 
      isVisible={isModalVisible} 
        backdropOpacity="0.9"
        // animationInTiming={100}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        // animationOutTiming={350}
        backdropTransitionOutTiming={0}>
        <SuccessModal/>
      </Modal>
    </View>
  );
}

export default ModalTester;