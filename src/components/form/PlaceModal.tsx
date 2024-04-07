import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import { SuggestForm, Suggestion } from "./SuggestForm";

interface PlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  startPlace: string;
  setStartPlace: (value: string) => void;
  endPlace: string;
  setEndPlace: (value: string) => void;
  transportation: string;
  setTransportation: (value: string) => void;
  requiredTime: string;
  setRequiredTime: (value: string) => void;
}

export const PlaceModal = ({
  isOpen,
  onClose,
  startPlace,
  setStartPlace,
  endPlace,
  setEndPlace,
  transportation,
  setTransportation,
  requiredTime,
  setRequiredTime,
}: PlaceModalProps) => {
  const transportationOption = [
    { value: "", label: "-" },
    { value: "Drive", label: "Drive" },
    { value: "Walk", label: "Walk" },
    { value: "Bicycle", label: "Bicycle" },
    { value: "Two Wheeler", label: "Two Wheeler" },
    { value: "Transit", label: "Transit" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>場所設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl p={2}>
              <FormLabel color="gray.700">出発地</FormLabel>
              <SuggestForm text={startPlace} setText={setStartPlace} />
            </FormControl>
            <FormControl p={2}>
              <FormLabel color="gray.700">目的地</FormLabel>
              <SuggestForm text={endPlace} setText={setEndPlace} />
            </FormControl>
            <FormControl p={2}>
              <FormLabel color="gray.700">交通手段</FormLabel>
              <Select
                borderColor="gray.200"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
              >
                {transportationOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
            閉じる
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (
                startPlace !== "" &&
                endPlace !== "" &&
                transportation !== ""
              ) {
                setRequiredTime("60");
              }
              onClose();
            }}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
