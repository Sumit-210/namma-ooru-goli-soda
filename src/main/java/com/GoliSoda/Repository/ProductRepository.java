package com.GoliSoda.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import com.GoliSoda.Entity.*;


@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}