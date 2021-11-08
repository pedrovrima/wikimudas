import {FiExternalLink} from "react-icons/fi"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton, Button
} from "@chakra-ui/react";



export default function RefPopover(props) {
    const {title, authors} = props
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Button p={0} size={"sm"} bg={""}><FiExternalLink/></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Referência</PopoverHeader>
        <PopoverBody>{`${title}. ${authors}`}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
