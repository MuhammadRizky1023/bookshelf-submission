const { addBookSelf, getAllBookSelf, getBookSelfId,  updatedBookSelfId, deletedBookSelfId} = require("../Handler/BookShelfHandler");

const routes = [
  {
    path: "/books",
    method: "POST",
    options: {
      cors: {
        origin: ['*']
      }
    },
    handler: addBookSelf
,
  
  },
  {
 
    path: "/books",
    method: 'GET',
    handler:  getAllBookSelf
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookSelfId
  },

  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updatedBookSelfId
  },
  {
    method: 'DELETE',
    path:  '/books/{id}',
    handler:deletedBookSelfId
  }
  

  
];

module.exports = routes;
