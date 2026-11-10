package com.university.erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class UniCoreErpApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniCoreErpApplication.class, args);
    }
}
