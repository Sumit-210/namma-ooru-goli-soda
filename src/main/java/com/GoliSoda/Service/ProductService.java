package com.GoliSoda.Service;
import com.GoliSoda.DTO.*;
import java.util.*;

public interface ProductService {

    ProductDTO addProduct(ProductDTO dto);

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(Long id);

    ProductDTO updateProduct(Long id, ProductDTO dto);

    void deleteProduct(Long id);
}
