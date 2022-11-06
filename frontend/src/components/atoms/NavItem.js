import {Flex, Icon, Text, Link} from '@chakra-ui/react';
import React from 'react';

export default function NavItem({icon, url, children, ...otherProps}) {
  return (
    <Link href={url} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
      <Flex
        h="20"
        p="2"
        my="auto"
        mt="2"
        role="group"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        fontSize="18"
        cursor="pointer"
        _hover={{
          bg: 'primary.300',
          color: 'white.300',
        }}
        {...otherProps}>
        {icon && (
          <Icon
            fontSize="18"
            _groupHover={{
              color: 'white.300',
            }}
            as={icon}
          />
        )}
        <Text fontSize="sm">
          {children}
        </Text>
      </Flex>
    </Link>
  );
};
