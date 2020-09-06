package ee.thenewyou.personaltrainer.controller.admin;


import ee.thenewyou.personaltrainer.dto.InstructionDto;
import ee.thenewyou.personaltrainer.exception.ResourceNotFoundException;
import ee.thenewyou.personaltrainer.model.Instruction;
import ee.thenewyou.personaltrainer.service.InstructionService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class InstructionController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private InstructionService instructionService;


    @PostMapping("/instruction")
    public ResponseEntity<Object> createInstruction(@Valid @RequestBody InstructionDto instructionDto) {
        Instruction savedInstruction = instructionService.save(convertToEntity(instructionDto));

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedInstruction.getInstructionId())
                .toUri();

        return ResponseEntity
                .created(location)
                .build();
    }

    private Instruction convertToEntity(InstructionDto instructionDto) {
        return modelMapper.map(instructionDto, Instruction.class);
    }


    @GetMapping("/instruction/{instruction_id}")
    public Instruction retrieveInstruction(@PathVariable("instruction_id") Long instructionId) throws ResourceNotFoundException {
        Optional<Instruction> instruction = instructionService.findById(instructionId);
        if (!instruction.isPresent()) {
            throw new ResourceNotFoundException("Instruction not found on :: " + instructionId);
        }
        return convertToDto(instruction.get());
    }

    @GetMapping("/instruction")
    public List<Instruction> retrieveInstructionsByChallengeDayId(@RequestParam(required = false) Long challengeId,
                                                                  @RequestParam(required = false) Integer weekNumberId,
                                                                  @RequestParam(required = false) Integer dayNumberId) throws ResourceNotFoundException {
        List<Instruction> instructionsByChallengeDayId = instructionService.findByChallengeDayId(challengeId,
                weekNumberId,
                dayNumberId);
        if (instructionsByChallengeDayId == null) {
            throw new ResourceNotFoundException("Instruction not found on :: " + challengeId);
        }
        return instructionsByChallengeDayId
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

    }

    @PutMapping(value = "/instruction/{instruction_id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateInstruction(
            @PathVariable("instruction_id") Long instructionId,
            @Valid @RequestBody InstructionDto instructionDto)
            throws ResourceNotFoundException {
        Optional<Instruction> foundInstructionOptional = instructionService.findById(instructionId);
        if (!foundInstructionOptional.isPresent()) {
            throw new ResourceNotFoundException("Instruction not found on :: " + instructionId);
        }
        Instruction foundInstruction = foundInstructionOptional.get();
        foundInstruction.setInstructionType(instructionDto.getInstructionType());
        foundInstruction.setStepCount(instructionDto.getStepCount());
        foundInstruction.setInstructionBody(instructionDto.getInstructionBody());
        foundInstruction.setMediaLink(instructionDto.getMediaLink());
        foundInstruction.setMediaType(instructionDto.getMediaType());

        instructionService.updateInstruction(foundInstruction);
    }


    @DeleteMapping("/instruction/{instruction_id}")
    public void deleteInstruction(@PathVariable(value = "instruction_id") Long instructionId) {
        instructionService.delete(instructionId);
    }


    private Instruction convertToDto(Instruction instruction) {
        return modelMapper.map(instruction, Instruction.class);
    }
}
