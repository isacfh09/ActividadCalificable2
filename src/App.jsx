import { useState,useEffect } from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const mockData = [
  { id: 1, nombre: "Auriculares Inalámbricos", precio: 120, categoria: "Electrónica" },
  { id: 2, nombre: "Silla de Escritorio", precio: 300, categoria: "Muebles" },
  { id: 3, nombre: "Cafetera Espresso", precio: 250, categoria: "Electrodomésticos" },
  { id: 4, nombre: "Juego de Mesa - Monopoly", precio: 50, categoria: "Juguetes" },
  { id: 5, nombre: "Libro de Programación en JavaScript", precio: 35, categoria: "Libros" },
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    categoria: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      ...formData,
      precio: parseFloat(formData.precio),
    };
    setProducts([...products, newProduct]);
    setFormData({ nombre: "", precio: "", categoria: "" });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} style={{ marginBottom: "40px" }}>
          <Table>
            <TableHead>
              <TableRow > 
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Categoría</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell>${product.precio}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '30px', width: '60%', margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Agregar Producto
        </Typography>
        <Box display="flex" flexDirection="column" gap={4}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
            required
          />
          <TextField
            label="Categoría"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            Agregar Producto
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default App;