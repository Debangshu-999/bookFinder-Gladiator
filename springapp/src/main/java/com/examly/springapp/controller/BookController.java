package com.examly.springapp.controller;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exception.BookException;
import com.examly.springapp.model.Book;
import com.examly.springapp.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService service;

    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody Book book){
        try {
            // System.out.println(book);
            Book obj = service.add(book);
           return ResponseEntity.status(201).body(obj);
        } catch (BookException e) {
           return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllBooks(){
        try {
            List<Book> listBook = service.getall();
           return ResponseEntity.status(200).body(listBook);
         } catch (Exception e) {
           return ResponseEntity.status(500).body(e.getMessage());
         }
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<?> editBook(@RequestBody Book book, @PathVariable int bookId){
        try {
            Book obj = service.updateBook(bookId, book);
            return ResponseEntity.status(201).body(obj);
         } catch (BookException e) {
           return ResponseEntity.status(404).body(e.getMessage());
         }
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getBookByID(@PathVariable int bookId){
        try {
            Book obj = service.getBookById(bookId);
            return ResponseEntity.status(200).body(obj);
         } catch (BookException e) {
            return ResponseEntity.status(404).body(e.getMessage());
         }
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable int bookId){
        try {
            service.deleteBook(bookId);
            return ResponseEntity.status(200).body("Book deleted successfully");
         } catch (BookException e) {
            return ResponseEntity.status(404).body("Failed to delete book");
         }
    }
}
