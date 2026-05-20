package com.GoliSoda.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.GoliSoda.Service.*;
import lombok.*;
import org.springframework.http.*;
import com.GoliSoda.DTO.*;
import jakarta.validation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(
            @Valid @RequestBody ProductDTO dto) {

        return new ResponseEntity<>(
                productService.addProduct(dto),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO dto) {

        return ResponseEntity.ok(
                productService.updateProduct(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.ok("Product deleted successfully");
    }
}