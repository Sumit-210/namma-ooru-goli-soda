package com.GoliSoda.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.GoliSoda.Entity.*;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
