package com.GoliSoda.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;
    

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;
    
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}