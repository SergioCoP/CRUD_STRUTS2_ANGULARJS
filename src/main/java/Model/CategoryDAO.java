package Model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import Connection.MySQLConnector;

public class CategoryDAO {
    CategoryBean category = new CategoryBean();

    private Connection conn;
    private Statement stmt;

    public CategoryDAO(){}

    public ArrayList<CategoryBean> obtenerCategorias(){
        ArrayList<CategoryBean> categorias = new ArrayList<>();
        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM category";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                int id = rs.getInt("idCat");
                String name = rs.getString("nameCat");
                String description = rs.getString("descriptionCat");
                categorias.add(new CategoryBean(id,name,description));
            }
            rs.close();
            stmt.close();
            conn.close();

        } catch (SQLException e) {
            Logger.getLogger(CategoryDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return categorias;
    }

    public CategoryBean obtenerCategoria(int id) {

        CategoryBean category = null;

        try {
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM category WHERE idCat = " + id;
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()) {
                int id1 = rs.getInt("idCat");
                String name1 = rs.getString("nameCat");
                String description1 = rs.getString("descriptionCat");
                category = new CategoryBean(id1,name1,description1);
            }
            rs.close();
            stmt.close();
            conn.close();

        } catch (SQLException ex) {
            Logger.getLogger(CategoryDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return category;
    }

    public int guardarCategoria(CategoryBean category){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "INSERT INTO category(idCat,nameCat,descriptionCat) VALUES(null ,'"+category.getName() +"','"+ category.getDescription() +"');";
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(CategoryBean.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }


    public int modificarCategoria(CategoryBean category){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "UPDATE category set nameCat = '" + category.getName() + "', descriptionCat = '" + category.getDescription()  + "' WHERE idCat = " + category.getId();
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(CategoryDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }

    public int eliminarCategoria(int categoriaId){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "DELETE FROM category WHERE idCat = " + categoriaId;
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(CategoryDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }


}
