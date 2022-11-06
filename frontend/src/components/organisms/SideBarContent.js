import React from 'react';
import {Box, CloseButton, Flex, Text} from '@chakra-ui/react';
import {AiOutlineHome} from 'react-icons/ai';
import {BiBriefcaseAlt} from 'react-icons/bi';
import {TbUserSearch, TbUsers} from 'react-icons/tb';
import NavItem from '../atoms/NavItem';
import Routes from '../../utils/Routes';
import {useTranslation} from 'react-i18next';
import SignOutButton from '../atoms/SignOutButton';


export default function SidebarContent({onClose, ...otherProps}) {
  const {t} = useTranslation();

  const LinkItems = [
    {name: t('home'), icon: AiOutlineHome, url: Routes.HOME},
    {name: t('jobs'), icon: BiBriefcaseAlt, url: Routes.JOBS},
    {name: t('candidates'), icon: TbUsers, url: Routes.CANDIDATES},
    {name: t('recruiters'), icon: TbUserSearch, url: Routes.RECRUITERS},
  ];

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
      <SignOutButton/>
    </Box>
  );
};
