package com.example.lyubimiytomatshop.controller;

import com.example.lyubimiytomatshop.entity.Attachment;
import com.example.lyubimiytomatshop.entity.AttachmentContent;
import com.example.lyubimiytomatshop.repo.AttachmentContentRepository;
import com.example.lyubimiytomatshop.repo.AttachmentRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AttachmentController {

    private final AttachmentRepository attachmentRepository;
    private final AttachmentContentRepository attachmentContentRepository;

    public AttachmentController(AttachmentRepository attachmentRepository,
                                AttachmentContentRepository attachmentContentRepository) {
        this.attachmentRepository = attachmentRepository;
        this.attachmentContentRepository = attachmentContentRepository;
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) {
        Optional<Attachment> optionalAttachment = attachmentRepository.findById(id);
        if (optionalAttachment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<AttachmentContent> optionalContent = attachmentContentRepository.findByAttachmentId(id);
        if (optionalContent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Attachment attachment = optionalAttachment.get();
        AttachmentContent content = optionalContent.get();

        String mimeType = getMimeTypeFromFileName(attachment.getFilename());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .body(content.getContent());
    }


    private String getMimeTypeFromFileName(String filename) {
        String mimeType = "application/octet-stream";
        try {
            Path path = Paths.get(filename);
            mimeType = Files.probeContentType(path);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return mimeType;
    }
}

