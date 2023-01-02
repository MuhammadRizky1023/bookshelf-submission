const { nanoid } = require('nanoid');
const books = require('../Model/BookShelf');


const addBookSelf = (req, res) => {
  try {
      const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading } = req.payload;

    if (name === undefined) {
        const response = res
          .response({
            error: true,
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }) 
        response.code(400);
        return response;
    } 

    if (readPage > pageCount) {
        const response = res
          .response({
             error: true,
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const addBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      };
      books.push(addBook);

    const sucessfully = books.filter((book) => book.id === id).length > 0;

    if (!sucessfully) {
       
    const response = res.response({
        error: true,
        status: 'error',
        message: 'Buku tidak berhasil ditambahkan'
    });
       response.code(500);
       return response;
    } else {
      const response = res.response({
            error: false,
            status: 'success',
            message:  'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
          response.code(201);
          response.header('Access-Control-Allow-Origin', '*');
          return response;
    }

  } catch (error) {
    
        const response = res.response({
        error: true,
        status: 'error',
        message: 'Buku tidak berhasil ditambahkan'
    });
       response.code(500);
       return response(error, res);
  }
};

const getAllBookSelf = (req, res) => {
  try {

     const { name, reading, finished } = req.params;
  
    const response = res.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
  
    if (reading === '1') {
      return {
        status: 'success',
        data: {
          books: books
            .filter((book) => book.reading === true)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
  
    if (reading !== undefined ) {
      return {
        status: 'success',
        data: {
          books: books
            .filter((bookShelf) => bookShelf.reading === false)
            .map((bookShelf) => ({
              id: bookShelf.id,
              name: bookShelf.name,
              publisher: bookShelf.publisher,
            })),
        },
      };
    }
  
    if (finished === '1') {
      return {
        status: 'success',
        data: {
          books: books
            .filter((bookShelf) => bookShelf.finished === true)
            .map((bookShelf) => ({
              id: bookShelf.id,
              name: bookShelf.name,
              publisher: bookShelf.publisher,
            })),
        },
      };
    }
  
  
    if (finished  !== undefined ) {
      return {
        status: 'success',
        data: {
          books: books
            .filter((bookShelf) => bookShelf.finished === false)
            .map((bookShelf) => ({
              id: bookShelf.id,
              name: bookShelf.name,
              publisher: bookShelf.publisher,
            })),
        },
      };
    }
  
    if (name !== undefined) {
      return {
        status: 'success',
        data: {
          books: books
            .filter((bookShelf) => bookShelf.name.toUpperCase().includes(name.toUpperCase()))
            .map((bookShelf) => ({
              id: bookShelf.id,
              name: bookShelf.name,
              publisher: bookShelf.publisher,
            })),
        },
      };
    }

    response.code(200);
    return response;

    
    
  }
  catch (error) {
     const response = res.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
   
};

const getBookSelfId = (req, res) => {
  try {
    const { id } = req.params;
  
    const bookShelf = books.filter((bookShelf) => bookShelf.id === id)[0];
  
    if (bookShelf !== undefined) {
      return {
        error: false,
        status: 'success',
        data: {
          books,
        },
      }
    };


    const response = res.response({
      error: true,
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  } catch (error) {
     const response = res.response({
      error: true,
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  }
    
  
   
const updatedBookSelfId = (req, res) => {
  try {
      const { id } = req.params;
  
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;
  
  const updatedAt = new Date().toISOString();
  
  
  if (name === undefined) {
    const response = res.response({
      error: true,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  
  if (readPage > pageCount) {
    const response = res.response({
      error: true,
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
    }
    
    const indexing = books.findIndex((book) => book.id === id);
  
  if (indexing !== -1) {
    books[indexing] = {
      ...books[indexing],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

     
    const response = res.response({
      error: false,
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = res.response({
    error: true,  
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
    response.code(404);
    return response;
    
  } catch (error) {
    const response = res.response({
    error: true,  
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
    response.code(404);
    return response;
}
     
};
  
  

const deletedBookSelfId = (req, res) => {
    try {
       const { id } = req.params;
  
    const construct = books.findIndex((book) => book.id === id);
  
    if (construct !== -1) {
      books.splice(construct, 1);
      const response = res.response({
        error: false,
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
      }
       const response = res.response({
      error: true,
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan"',
    });
    response.code(404);
    return response;
  
    } catch (error) {
      const response = res.response({
      error: true,
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan"',
    });
    response.code(404);
    return response;
    }
   
  };

module.exports = { addBookSelf, getAllBookSelf, getBookSelfId, updatedBookSelfId, deletedBookSelfId };