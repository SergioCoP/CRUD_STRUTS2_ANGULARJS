package Model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import Connection.MySQLConnector;

import javax.servlet.ServletOutputStream;

public class ProductDAO {

    private Connection conn;
    private Statement stmt;

    public ProductDAO(){}

    public ArrayList<ProductBean> obtenerProductos(){
        ArrayList<ProductBean> productos = new ArrayList<>();
       ProductBean producto = null;
        CategoryBean category = null;
        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT p.idProd,p.nameProd,p.descriptionProd,p.price,p.weight,p.category_id,p.image,c.nameCat,c.descriptionCat FROM products as p inner join category as c on p.category_id = c.idCat";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                producto = new ProductBean();
                producto.setId(rs.getInt("idProd"));
                producto.setName(rs.getString("nameProd"));
                producto.setDescription(rs.getString("descriptionProd"));
                producto.setPrice(rs.getDouble("price"));
                producto.setWeight(rs.getDouble("weight"));
                producto.setImage(rs.getString("image"));
                category = new CategoryBean();
                category.setId(rs.getInt("category_id")) ;
                category.setName(rs.getString("nameCat"));
                category.setDescription(rs.getString("descriptionCat"));
                producto.setCategory_id(category);
                productos.add(producto);
            }
            rs.close();
            stmt.close();
            conn.close();

        } catch (SQLException e) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return productos;
    }



    public ProductBean obtenerProducto(int id) {

        ProductBean producto = null;
        CategoryBean category = null;

        try {
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT p.idProd,p.nameProd,p.descriptionProd,p.price,p.weight,p.category_id,p.image,c.nameCat FROM products as p inner join category as c on p.category_id = c.idCat WHERE p.idProd = " + id;
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()) {
                producto = new ProductBean();
                producto.setId(rs.getInt("idProd"));
                producto.setName(rs.getString("nameProd"));
                producto.setDescription(rs.getString("descriptionProd"));
                producto.setPrice(rs.getDouble("price"));
                producto.setWeight(rs.getDouble("weight"));
                producto.setImage(rs.getString("image"));
                category = new CategoryBean();
                category.setId(rs.getInt("category_id"));
                category.setName(rs.getString("nameCat"));
                category.setDescription(rs.getString("descriptionCat"));
                producto.setCategory_id(category);
            }
            rs.close();
            stmt.close();
            conn.close();

        } catch (SQLException ex) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return producto;
    }

    public int guardarProducto(ProductBean producto){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "INSERT INTO products(idProd,category_id,nameProd,descriptionProd,image,price,weight) VALUES(null ,'"+ producto.getCategory_id().getId() +"','"+ producto.getName() +"','"+ producto.getDescription() +"','"+ producto.getImage() +"','"+ producto.getPrice() +"','"+ producto.getWeight() +"');";
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }

    public int modificarProducto(ProductBean producto){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "UPDATE products set nameProd = '" + producto.getName() + "', descriptionProd = '" + producto.getDescription() + "',category_id = '" + producto.getCategory_id().getId() + "',image = '" + producto.getImage() + "', price = '" + producto.getPrice() + "',weight = '" + producto.getWeight() + "' WHERE idProd = " + producto.getId();
            rs = stmt.executeUpdate(sql);
            System.out.println("Mostrando la respuesta de la actualización");
            System.out.println(rs);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, e);
            System.out.println(e);
        }
        return rs;
    }

    public int eliminarProducto(int productoId){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "DELETE FROM products WHERE idProd = " + productoId;
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }

    public  ResultSet productDetails(){
        ResultSet rs = null;
        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT p.nameProd,p.price,c.nameCat FROM products as p inner join category as c on p.category_id = c.idCat";
           rs = stmt.executeQuery(sql);

        }catch (Exception e){
            e.printStackTrace();
        }
      return rs;

    }
}
