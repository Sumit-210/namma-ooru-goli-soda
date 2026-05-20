package com.GoliSoda.Service;
import org.springframework.stereotype.*;
import com.GoliSoda.Entity.*;
import com.GoliSoda.Repository.*;
import java.util.*;
import lombok.*;
import com.GoliSoda.DTO.*;
import com.GoliSoda.CustomException.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImp implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDTO addProduct(ProductDTO dto) {

        ProductEntity product = mapToEntity(dto);

        ProductEntity saved = productRepository.save(product);

        return mapToDTO(saved);
    }

    @Override
    public List<ProductDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public ProductDTO getProductById(Long id) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return mapToDTO(product);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO dto) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        product.setName(dto.getName());
        product.setFlavor(dto.getFlavor());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        product.setDescription(dto.getDescription());

        ProductEntity updated = productRepository.save(product);

        return mapToDTO(updated);
    }

    @Override
    public void deleteProduct(Long id) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }

    // ------------------------

    private ProductDTO mapToDTO(ProductEntity product) {

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getFlavor(),
                product.getPrice(),
                product.getImageUrl(),
                product.getDescription()
        );
    }

    private ProductEntity mapToEntity(ProductDTO dto) {

        return new ProductEntity(
                dto.getId(),
                dto.getName(),
                dto.getFlavor(),
                dto.getPrice(),
                dto.getImageUrl(),
                dto.getDescription()
        );
    }
}