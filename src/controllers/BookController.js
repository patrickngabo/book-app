import BookService from '../services/BookService';

class BookController {
  static async getAllBooks(req, res) {
    try {
      const allBooks = await BookService.getAllBooks();
      return allBooks.length
        ? res.status(200).json({ message: 'Books retrieved', allBooks })
        : res.status(404).json({ error: 'No book found' });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async addBook(req, res) {
    try {
      if (!req.body.title || !req.body.price || !req.body.description) {
        return res.status(400).json({ error: 'Please provide complete details' });
      }
      const newBook = req.body;
      const createdBook = await BookService.addBook(newBook);
      return res.status(201).json({ message: 'Book Added!', createdBook });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updatedBook(req, res) {
    try {
      const alteredBook = req.body;
      const { id } = req.params;
      if (!Number(id)) {
        return res.status(400).json({ error: 'Please input a valid numeric value' });
      }

      const updateBook = await BookService.updateBook(id, alteredBook);
      return updateBook
        ? res.status(200).json({ message: 'Book updated', updateBook })
        : res.status(404).json({ error: `Cannot find book with the id: ${id}` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getABook(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({ error: 'Please input a valid numeric value' });
    }
    try {
      const theBook = await BookService.getABook(id);
      return theBook
        ? res.status(200).json({ message: 'Found Book', theBook })
        : res.status(404).json({ error: `Cannot find book with the id ${id}` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({ error: 'Please provide a numeric value' });
    }
    try {
      const bookToDelete = await BookService.deleteBook(id);
      return bookToDelete ? res.status(200).json({ message: 'Book deleted' })
        : res.status(404).json({ error: `Book with the id ${id} cannot be found` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
export default BookController;
