import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, FormControl, FormLabel, Grid, IconButton, Input, Tag, Text, useDisclosure} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {AiOutlineArrowRight, AiOutlineEdit} from 'react-icons/ai';
import {MdAdd} from 'react-icons/md';
import Card from '../atoms/Card';
import SidebarWithHeader from '../organisms/SidebarWithHeader';
import ModalForm from '../organisms/ModalForm';
import {connect} from 'react-redux';
import {addNewRecruiter, getAllRecruiters as getAllRecruitersAction} from '../../state/actions/admin';

const RecruiterListings = ({currentUserId, addRecruiter, getAllRecruiters, recruiters}) => {
  const {t} = useTranslation();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState();

  useEffect(() => {
    getAllRecruiters(currentUserId);
  }, []);
  

  const onChangeData = (e, field) => {
    setData({
      ...data,
      [field]: e.target.value,
    });
  };

  const submitData = () => {
    addRecruiter({
      ...data,
      currentUserId,
    });
    onClose();
  };

  return <>
    <SidebarWithHeader>
      <Flex justifyContent="space-between" alignItems="center" mb="5">
        <Text fontSize="4xl">{t('recruiter-listings')}</Text>
        <Button leftIcon={<MdAdd/>} mr="5" bg="primary.300" color="white.300" _hover={{bg: 'primary.500'}} onClick={onOpen}>{t('add-recruiter')}</Button>
      </Flex>

      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {recruiters?.map((rec, index) => (
          <Card mr="5" p="6" key={index}>
            <Flex justifyContent="space-between">
              <Box>
                <Text fontSize="2xl" as="b" color="primary.500">{rec.firstName} {rec.lastName}</Text>
                <Text color="black.300">{rec.email}</Text>
                <Text color="black.300">Company: {rec.companyName}</Text>
              </Box>
              <Box>
                <Flex direction="column" gap="2">
                  <IconButton icon={<AiOutlineArrowRight/>} color="white.300" bg="primary.300" _hover={{bg: 'primary.500'}} />
                  {/* <IconButton icon={<AiOutlineEdit/>}/> */}
                {/* {rec.isLoggedFirstTime && <Tag size="md" color="white" bg="red.100">Inactive</Tag>} */}
                </Flex>
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>
    </SidebarWithHeader>

    <ModalForm isOpen={isOpen} onClose={onClose} submitText={t('add')} onSubmit={submitData}>
      <FormControl isRequired>
        <FormLabel>{t('first-name-label')}</FormLabel>
        <Input placeholder={t('first-name-label')} onChange={(e) => onChangeData(e, 'firstName')}/>
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel >{t('last-name-label')}</FormLabel>
        <Input placeholder={t('last-name-label')} onChange={(e) => onChangeData(e, 'lastName')}/>
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel>{t('email-label')}</FormLabel>
        <Input placeholder={t('email-label')} onChange={(e) => onChangeData(e, 'email')}/>
      </FormControl>
    </ModalForm>
  </>;
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.authReducer.currentUser.id,
    recruiters: state.adminReducer.recruiters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addRecruiter: (recruiter) => dispatch(addNewRecruiter(recruiter)),
    getAllRecruiters: (currentUserId) => dispatch(getAllRecruitersAction(currentUserId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(RecruiterListings);
