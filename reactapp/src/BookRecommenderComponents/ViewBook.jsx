import React, { useEffect } from 'react'

function ViewBook() {
    const bookList = []
    return (
        <div>
            <h1>Books</h1>
            <table>
                <thead>
                    <tr>
                        <td>Cover Image</td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Publication Date</td>
                        <td>Genre</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>erwtyu</td>
                        <td>Test Book</td>
                        <td>Test Author</td>
                        <td>Test Genre</td>
                        <td>fsdghj</td>
                        <td>
                            <button>Delete</button>
                            <p>Are you sure you want to delete this book?</p>
                        </td>

                    </tr>

                    <p>Oops! No records found</p>
                </tbody>
            </table>
        </div>
    )
}

export default ViewBook