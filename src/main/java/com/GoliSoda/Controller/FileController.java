package com.GoliSoda.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import java.io.IOException;
import com.GoliSoda.Service.*;
import lombok.*;
import java.util.Map;
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file")
            MultipartFile file)
            throws IOException {

        String fileName =
                fileService.uploadFile(file);

        return ResponseEntity.ok(
                Map.of(
                        "imageUrl",
                        "http://localhost:8080/uploads/"
                                + fileName
                )
        );
    }
}