import React from 'react';
import {Box, Drawer, DrawerContent, useDisclosure} from '@chakra-ui/react';
import SidebarContent from '../molecules/SideBarContent';
import Header from './Header';

function SidebarWithHeader({children}) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Box minH="100vh" bg="secondary.300">
      <SidebarContent
        onClose={() => onClose}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <Header onOpen={onOpen} />
      <Box ml={{base: 0, md: 28}} p="4">
        {children}
      </Box>
    </Box>
  );
}

export default SidebarWithHeader;
