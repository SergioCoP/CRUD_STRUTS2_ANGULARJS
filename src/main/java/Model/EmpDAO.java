package Model;


import java.sql.*;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import Connection.MySQLConnector;
public class EmpDAO {
    //Conexión
//    private final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
//    public  final String DB_URL = "jdbc:mysql://localhost:3306/strutsangularcrud"; //:3306
//    public  final String USUARIO = "root";
//    public  final String CONTRASENA = "root";
    EmpBean empleado = new EmpBean();
    private Connection conn;
    private Statement stmt;
    public EmpDAO(){}
    public ArrayList<EmpBean> obtenerEmpleados(){
        ArrayList<EmpBean> empleados = new ArrayList<>();
        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM cliente";
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()){
                int id = rs.getInt("id");
                String nombre = rs.getString("name");
                String email = rs.getString("email");
                empleados.add(new EmpBean(id,nombre,email));
            }
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return empleados;
    }
    public EmpBean obtenerEmpleado(int id) {

        EmpBean empleado = null;

        try {
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM cliente WHERE id = " + id;
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()) {
                int id1 = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                empleado = new EmpBean(id1, name, email);
            }
            rs.close();
            stmt.close();
            conn.close();

        } catch (SQLException ex) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return empleado;
    }


    public int guardarEmpleado(EmpBean empleado){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "INSERT INTO cliente(id,name,email) VALUES(null ,'"+ empleado.getName() +"','"+ empleado.getEmail() +"');";
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }

    public int modificarEmpleado(EmpBean empleado){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "UPDATE cliente set name = '" + empleado.getName() + "', email = '" + empleado.getEmail() + "' WHERE id = " + empleado.getId();
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }

    public int eliminarEmpleado(int empleadoId){
        int rs = 0;

        try{
            conn = MySQLConnector.getConnection();
            stmt = conn.createStatement();
            String sql = "DELETE FROM cliente WHERE id = " + empleadoId;
            rs = stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, e);
        }
        return rs;
    }

//    private Connection conectarAoBancoDeDados() {
//        try {
//            Class.forName(JDBC_DRIVER);
//            Connection connection = DriverManager.getConnection(DB_URL, USUARIO, CONTRASENA);
//            return connection;
//
//        } catch (ClassNotFoundException e) {
//            System.out.println("Error: " + e.getMessage());
//        } catch (SQLException ex) {
//            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return null;
//    }
}
