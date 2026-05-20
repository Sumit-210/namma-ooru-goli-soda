package com.GoliSoda.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import com.GoliSoda.Entity.*;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}