package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
    
    
    @Query("SELECT b FROM Book b WHERE b.title = :title")
    Optional<Book> findByTitles(@Param("title") String title);

    
    // Book findByTitle(String title);

    
}