import { useState, useContext, useEffect } from "react";
import { BookContext } from "../GlobalContext/BookContext";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Components/Modal";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

import "./BookForm.css";

const BookForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const { addBook, updateBook, getBookById, loading, error } =
    useContext(BookContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
    coverImage: null,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({ type: "", message: "" });

  /* ================= Fetch book in EDIT mode ================= */
  useEffect(() => {
    if (!isEditMode) return;

    const fetchBook = async () => {
      try {
        const book = await getBookById(id);
        setFormData({
          title: book.title,
          author: book.author,
          publishedDate: book.publishedDate,
          genre: book.genre,
          coverImage: null,
        });
      } catch (err) {
        setModal({
          type: "error",
          message: err.message || "Failed to load book",
        });
        setShowModal(true);
      }
    };

    fetchBook();
  }, [id, isEditMode, getBookById]);

  /* ================= Handlers ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: e.target.files[0],
    }));
  };

  /* ================= Validation ================= */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.publishedDate)
      newErrors.publishedDate = "Published date is required";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required";


    if (!isEditMode && !formData.coverImage)
      newErrors.coverImage = "Cover image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= Submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await updateBook({ id, ...formData });
        setModal({ type: "success", message: "Book updated successfully!" });
      } else {
        await addBook({ ...formData });
        setModal({ type: "success", message: "Book added successfully!" });
        setFormData({
          title: "",
          author: "",
          publishedDate: "",
          genre: "",
          coverImage: null
        });
      }

      setErrors({});
      setShowModal(true);
    } catch (err) {
      setModal({
        type: "error",
        message: err.message || "Operation failed",
      });
      setShowModal(true);
    }
  };

  const handleSuccessConfirm = () => {
    setShowModal(false);
    navigate("/viewbook");
  };

  const handleErrorClose = () => {
    setShowModal(false);
    // if (isEditMode) navigate("/viewbook");
  };

  return (
    <Box className="book-form-page">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Paper elevation={8} className="book-form-card">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              className="back-btn"
            >
              Back
            </Button>

            <Typography variant="h4" className="form-title">
              {isEditMode ? "Edit Book" : "Add a New Book"}
            </Typography>

            <Typography className="form-subtitle">
              {isEditMode
                ? "Update the details of your book"
                : "Fill in the details to add a new book to the library"}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Title */}
                <TextField
                  label="Book Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                />
                {errors.title && (
                  <Typography variant="caption" color="error">
                    {errors.title}
                  </Typography>
                )}

                {/* Author */}
                <TextField
                  label="Author Name"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  fullWidth
                />
                {errors.author && (
                  <Typography variant="caption" color="error">
                    {errors.author}
                  </Typography>
                )}

                {/* Date */}
                <TextField
                  label="Published Date"
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                {errors.publishedDate && (
                  <Typography variant="caption" color="error">
                    {errors.publishedDate}
                  </Typography>
                )}

                {/* Genre */}
                <TextField
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  fullWidth
                />
                {errors.genre && (
                  <Typography variant="caption" color="error">
                    {errors.genre}
                  </Typography>
                )}

                {/* Cover Image */}
                <Stack spacing={0.5}>
                  <Button
                    variant="outlined"
                    component="label"
                    className="upload-btn"
                  >
                    {isEditMode ? "Replace Cover Image" : "Upload Cover Image"}
                    <input
                      hidden
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {errors.coverImage && (
                    <Typography variant="caption" color="error">
                      {errors.coverImage}
                    </Typography>
                  )}
                </Stack>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  className="submit-btn"
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                      
                    : isEditMode
                      ? "Update Book"
                      : "Add Book"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </motion.div>

        {showModal && (
          <Modal
            type={modal.type}
            message={modal.message}
            onConfirm={handleSuccessConfirm}
            onClose={handleErrorClose}
          />
        )}
      </Container>
    </Box>
  );
};

export default BookForm;
