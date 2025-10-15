package com.jayarrakesh.book.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;
import static java.lang.System.currentTimeMillis;

@Service
@Slf4j
public class FileStorageService {

    @Value("${application.file.upload.photos-output-path:./uploads}") // Added default value
    private String fileUploadPath;

    public String saveFile(
            MultipartFile sourceFile,
            String userId
    ) {
        // Validate input parameters
        if (sourceFile == null || sourceFile.isEmpty()) {
            throw new IllegalArgumentException("File cannot be null or empty");
        }
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }

        log.info("📁 File upload path configured: {}", fileUploadPath);

        final String fileUploadSubPath = "users" + separator + userId;
        return uploadFile(sourceFile, fileUploadSubPath);
    }

    private String uploadFile(
            MultipartFile sourceFile,
            String fileUploadSubPath
    ) {
        try {
            // Create final upload path
            final String finalUploadPath = fileUploadPath + separator + fileUploadSubPath;
            Path targetFolderPath = Paths.get(finalUploadPath);

            log.info("📁 Creating directories at: {}", targetFolderPath.toAbsolutePath());

            // Create directories if they don't exist
            Files.createDirectories(targetFolderPath);
            log.info("✅ Directories created successfully");

            // Generate unique filename
            final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
            String fileName = currentTimeMillis() + "." + fileExtension;
            Path targetFilePath = targetFolderPath.resolve(fileName);

            // Save the file
            Files.write(targetFilePath, sourceFile.getBytes());
            log.info("✅ File saved successfully at: {}", targetFilePath.toAbsolutePath());

            return targetFilePath.toString();

        } catch (IOException e) {
            log.error("❌ Failed to save file to path: {}", fileUploadPath, e);
            throw new RuntimeException("Failed to save file: " + e.getMessage(), e);
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            throw new IllegalArgumentException("File name cannot be null or empty");
        }

        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new IllegalArgumentException("File has no extension: " + fileName);
        }

        return fileName.substring(lastDotIndex + 1).toLowerCase();
    }

    /**
     * Utility method to check if file exists
     */
    public boolean fileExists(String filePath) {
        if (filePath == null || filePath.trim().isEmpty()) {
            return false;
        }
        return Files.exists(Paths.get(filePath));
    }
}