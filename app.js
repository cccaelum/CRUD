const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//READ
app.get('/', (req, res) => {
  res.send(`
  <h1>Usuarios - Street Fighter</h1>
  <ul>
  ${usuarios
    .map((usuario) => `<li>id: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad} - País: ${usuario.lugarProcedencia}  </li>`)
    .join('')}
  </ul>
  <a href="/usuarios">usuarios json</a>
  `);
});


app.get('/usuarios', (req, res) => {
    res.json(usuarios);
  })

//CREATE
app.post('/usuarios', (req, res) => {
    const nuevoUser = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUser);
    res.redirect('/');
  });

// UPDATE
app.put('/usuarios/:nombre', (req, res) => {
  const nombreUsuario = req.params.nombre;
  const usuario = usuarios.find(usuario => usuario.nombre === nombreUsuario); // Encontrar el usuario por nombre

  if (usuario) { 
      usuario.nombre = req.body.nombre || usuario.nombre;
      usuario.edad = req.body.edad || usuario.edad;
      usuario.lugarProcedencia = req.body.lugarProcedencia || usuario.lugarProcedencia;
      res.json({ message: `Usuario ${nombreUsuario} actualizado`, usuario: usuario });
  } else {
      res.status(404).json({ message: `Usuario ${nombreUsuario} no encontrado` });
  }
});

  
// DELETE
app.delete('/usuarios/:nombre', (req, res) => {
  const nombreUsuario = req.params.nombre;
  const usuario = usuarios.find(usuario => usuario.nombre === nombreUsuario); 

  if (usuario) { 
      usuarios = usuarios.filter(usuario => usuario.nombre !== nombreUsuario); // Filtrar los usuarios excluyendo al que se debe eliminar
      res.json({ message: `Usuario ${nombreUsuario} eliminado` });
  } else {
      res.status(404).json({ message: `Usuario ${nombreUsuario} no encontrado` });
  }
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });

