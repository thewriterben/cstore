import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import apiService from '../services/api';
import type { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts();
  }, [page, rowsPerPage, search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts(page + 1, rowsPerPage, search);
      setProducts(response.data);
      setTotal(response.pagination?.total || 0);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(productId);
        loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {/* TODO: Open create dialog */}}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price (USD)</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {product.category?.name || 'No category'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>${product.priceUSD.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock}
                      size="small"
                      color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    {product.isActive ? (
                      <Chip
                        icon={<CheckCircle />}
                        label="Active"
                        size="small"
                        color="success"
                      />
                    ) : (
                      <Chip
                        icon={<Cancel />}
                        label="Inactive"
                        size="small"
                        color="default"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {product.averageRating ? (
                      <Box>
                        ⭐ {product.averageRating.toFixed(1)}
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                          ({product.numReviews})
                        </Typography>
                      </Box>
                    ) : (
                      'No reviews'
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => {/* TODO: Open edit dialog */}}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Products;
