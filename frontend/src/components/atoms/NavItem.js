import {Flex, Icon, Link} from '@chakra-ui/react';
import React from 'react';

export default function NavItem({icon, url, children, ...otherProps}) {
  return (
    <Link href={url} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
      <Flex
        p="4"
        mx="4"
        mt="4"
        borderRadius="lg"
        role="group"
        flexDir="column"
        alignItems="center"
        cursor="pointer"
        _hover={{
          bg: 'primary.300',
          color: 'white.300',
        }}
        {...otherProps}>
        {icon && (
          <Icon
            fontSize="46"
            _groupHover={{
              color: 'white.300',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
