import React from 'react';
import {Box, CloseButton, Flex, Text} from '@chakra-ui/react';
import {AiOutlineHome} from 'react-icons/ai';
import {BiBriefcaseAlt} from 'react-icons/bi';
import {BsPerson} from 'react-icons/bs';
import NavItem from '../atoms/NavItem';
import Routes from '../../utils/Routes';


const LinkItems = [
  {name: 'Home', icon: AiOutlineHome, url: Routes.HOME},
  {name: 'Jobs', icon: BiBriefcaseAlt, url: Routes.JOBS},
  {name: 'Candidates', icon: BsPerson, url: Routes.CANDIDATES},
];

export default function SidebarContent({onClose, ...otherProps}) {
  return (
    <Box
      transition="3s ease"
      bg="white.300"
      shadow="lg"
      pos="fixed"
      h="full"
      {...otherProps}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
