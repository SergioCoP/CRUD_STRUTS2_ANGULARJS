package Connection;
import Model.EmpDAO;



import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MySQLConnector {
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver"; //old driver: com.mysql.jdbc.Driver
    public static final String DB_URL = "jdbc:mysql://localhost:3306/sgein"; //:3306
//    public static final String DB_URL = "jdbc:mysql://localhost:3306/strutsangularcrud";
    public static final String USUARIO = "root";
    public static final String CONTRASENA = "root";

    public static Connection getConnection() {
        try {
            Class.forName(JDBC_DRIVER);
            Connection connection = DriverManager.getConnection(DB_URL, USUARIO, CONTRASENA);
            return connection;

        } catch (ClassNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (SQLException ex) {
            Logger.getLogger(EmpDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
