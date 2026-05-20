package com.GoliSoda.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shopName;

    private String ownerName;

    private String phone;

    private String location;

    private LocalDateTime orderedAt;
    
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "order",
            cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();
}