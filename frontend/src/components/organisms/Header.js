import React from 'react';
import {Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack} from '@chakra-ui/react';
import {FiChevronDown} from 'react-icons/fi';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';

function Header({onOpen, currentUser, ...otherProps}) {
  const {t} = useTranslation();
  return (
    <Flex
      px={{base: 4, md: 4}}
      height="20"
      alignItems="center"
      bg="white.300"
      justifyContent={{base: 'space-between', md: 'flex-end'}}
      {...otherProps}>

      <Text
        display={{base: 'flex', md: 'none'}}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{base: '0', md: '6'}}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{boxShadow: 'none'}}>
              <HStack mr="4">
                <Avatar
                  size={'sm'}
                  name={currentUser.name}
                />
                <VStack
                  display={{base: 'none', md: 'flex'}}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text m="0" fontSize="md" fontWeight='500'>{currentUser.name}</Text>
                  {/* <Text m="0"fontSize="xs" color="secondary.500">
                    admin
                  </Text> */}
                </VStack>
                {/* <Box display={{base: 'none', md: 'flex'}}>
                  <FiChevronDown />
                </Box> */}
              </HStack>
            </MenuButton>
            {/* <MenuList
              bg={'white.300'}
              borderColor={'secondary.300'}>
              <MenuItem>{t('profile')}</MenuItem>
              <MenuItem>{t('settings')}</MenuItem>
              <MenuDivider />
              <MenuItem>{t('sign-out')}</MenuItem>
            </MenuList> */}
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.authReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);



