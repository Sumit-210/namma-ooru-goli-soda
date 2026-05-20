package com.GoliSoda.DTO;
import lombok.*;
import jakarta.validation.constraints.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Flavor is required")
    private String flavor;

    @NotNull(message = "Price is required")
    private Double price;

    private String imageUrl;

    private String description;
}
