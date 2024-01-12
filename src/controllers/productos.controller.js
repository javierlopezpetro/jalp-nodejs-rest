import { pool } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM producto");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const getProducto = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM producto WHERE idproducto = ?",
      req.params.id
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }
    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const postProductos = async (req, res) => {
  try {
    const { idproducto, nombre, precio } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO producto (idproducto, nombre, precio) VALUES(?, ?, ?)",
      [idproducto, nombre, precio]
    );
    res.send({ id: idproducto, nombre, precio });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const deleteProductos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM producto WHERE idproducto = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const putProductos = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const [result] = await pool.query(
      "UPDATE producto SET nombre = IFNULL(?, nombre), precio = IFNULL(?, precio) WHERE idproducto = ?",
      [nombre, precio, req.params.id]
    );

    if(result.affectedRows === 0){
      return res.status(404).json(
        {
          message: 'Recurso no encontrado'
        }
      )
    }


    const [newAct] = await pool.query(
      "SELECT * FROM producto WHERE idproducto = ?",
      [req.params.id]
    );
    res.send(newAct[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
    });
  }
};
