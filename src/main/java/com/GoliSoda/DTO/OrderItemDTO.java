package com.GoliSoda.DTO;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {

    private Long productId;

    private Integer quantity;
}