package com.example.demo.Repository;

import com.example.demo.Entities.SSHConnection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SShRepository  extends JpaRepository<SSHConnection,Long> {
}
