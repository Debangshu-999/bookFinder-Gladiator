import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function BookRecommenderNavbar() {

    const [open, setOpen] = useState(false);

  return (
    <nav>
        <div>BookFinder</div>

        <div>
            <Link to="/home">Home</Link>
        </div>

        <div onMouseEnter={() => setOpen(true)} onMouseLeave={()=>setOpen(false)}>
            <button>Book</button>

            {
                open && (
                    <div>
                        <Link to="/newbook">Add Book</Link>
                        <Link to="/viewbook">View Book</Link>
                    </div>
                )
            }
        </div>
    </nav>
  )
}

export default BookRecommenderNavbar