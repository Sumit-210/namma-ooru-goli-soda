package com.GoliSoda.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponseDTO {

    private Long orderId;

    private String status;

    private String whatsappUrl;
}
