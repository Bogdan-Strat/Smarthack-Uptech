import React from 'react';
import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

const ModalForm = ({isOpen, onClose, onSubmit, submitText, children}) => {
  const {t} = useTranslation();

  return <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <Text fontSize="2xl">{t('add-new-recruiter-title')}</Text></ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        {children}
      </ModalBody>

      <ModalFooter>
        <Button bg="primary.300" color="white.300" _hover={{bg: 'primary.500'}} mr={3} onClick={onSubmit}>
          {submitText}
        </Button>
        <Button onClick={onClose}>{t('cancel')}</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};

export default ModalForm;
