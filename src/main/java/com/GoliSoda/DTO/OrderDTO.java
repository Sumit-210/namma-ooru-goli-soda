package com.GoliSoda.DTO;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    @NotBlank
    private String shopName;

    @NotBlank
    private String ownerName;

    @NotBlank
    private String phone;

    @NotBlank
    private String location;

    private List<OrderItemDTO> items;
}
