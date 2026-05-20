package com.GoliSoda.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import com.GoliSoda.Entity.*;
import org.springframework.stereotype.*;

@Repository
public interface AdminRepository
        extends JpaRepository<Admin, Long> {

    Optional<Admin> findByUsername(String username);
}