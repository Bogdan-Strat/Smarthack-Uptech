import React from 'react';
import {Avatar, Box, Flex, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack} from '@chakra-ui/react';
import {FiChevronDown} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Header({onOpen, ...otherProps}) {
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
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{base: 'none', md: 'flex'}}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="secondary.300">
                    Admin
                  </Text>
                </VStack>
                <Box display={{base: 'none', md: 'flex'}}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={'white.300'}
              borderColor={'secondary.300'}>
              <MenuItem>{t('profile')}</MenuItem>
              <MenuItem>{t('settings')}</MenuItem>
              <MenuDivider />
              <MenuItem>{t('sign-out')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
