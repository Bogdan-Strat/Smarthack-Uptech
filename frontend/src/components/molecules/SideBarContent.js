import React from 'react';
import {Box, CloseButton, Flex, Avatar} from '@chakra-ui/react';
import {AiOutlineHome} from 'react-icons/ai';
import {BiBriefcaseAlt} from 'react-icons/bi';
import {TbUserSearch, TbUsers} from 'react-icons/tb';
import {MdOutlineVideoCameraFront} from 'react-icons/md';
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
    {name: 'Interviews', icon: MdOutlineVideoCameraFront, url: Routes.INTERVIEWS}
  ];

  return (
    <Flex
      transition="3s ease"
      direction="column"
      bg="white.300"
      shadow="lg"
      pos="fixed"
      h="full"
      {...otherProps}>
      <Flex h="20" alignItems="center" justifyContent="center">
        <Avatar size="md" src="https://i.imgur.com/00GVjfm.png"/>
        {/* <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose} /> */}
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
      <Box mt="auto" mb="4">
        <SignOutButton/>
      </Box>
    </Flex>
  );
};
