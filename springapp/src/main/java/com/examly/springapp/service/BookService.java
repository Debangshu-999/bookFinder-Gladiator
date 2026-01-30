package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.BookException;
import com.examly.springapp.model.Book;
import com.examly.springapp.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book add(Book book) throws BookException{
        Optional<Book> res = bookRepository.findByTitles(book.getTitle());
        if(res.isPresent()){
            throw new BookException("Failed to add book");
        }
        // System.out.println(book);
        Book r = bookRepository.save(book);
        // Book obj = bookRepository.findByTitle(book.getTitle());
        // System.out.println(obj.getTitle());
        return r;
    }


    public List<Book> getall(){
        List<Book> books = bookRepository.findAll();
        return books;

    }

    public Book getBookById(int id) throws BookException{
        Book res = null;
        if(bookRepository.existsById(id)){
            Optional<Book> bk = bookRepository.findById(id);
            res=bk.get();
             
        }else{
            throw new BookException("Book not found");
        }
        return res;
    }

    public Book updateBook(int id , Book book) throws BookException{
        Book res = null;
        if(bookRepository.existsById(id)){
            Optional<Book> bk = bookRepository.findById(id);
            res=bk.get();
            res.setTitle(book.getTitle());
            res.setAuthor(book.getAuthor());
            res.setGenre(book.getGenre());
            res.setPublishedDate(book.getPublishedDate());
            res.setCoverImage(book.getCoverImage());
            bookRepository.save(res);
        }
        else{
            throw new BookException("Cannot update. Book not found with ID: "+id);
        }
        return res;
    }

    public Boolean deleteBook(int id) throws BookException{
        if(bookRepository.existsById(id)){
            bookRepository.deleteById(id);
            return true;
        }
        else{
            throw new BookException("Cannot delete. Book not found with ID: "+id);
        }
    }
    
}