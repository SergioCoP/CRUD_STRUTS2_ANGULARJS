package Actions;
import Model.*;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;
import net.sf.jasperreports.engine.*;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.struts2.ServletActionContext;

import java.io.File;
import java.io.FileInputStream;
import java.sql.ResultSet;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class ProductAction extends ActionSupport{
    String params;
    private ResultSet rs;
    private List<ProductBean> productReport = new ArrayList<>();
    Map<String,Object> result = new HashMap<>();
    private ProductBean product = new ProductBean();
    ProductDAO productDAO = new ProductDAO();
    ArrayList<ProductBean> productlist = new ArrayList<>();

    public String findAll() throws Exception {
       productlist = productDAO.obtenerProductos();
        return SUCCESS;
    }

    public String findById() throws Exception {
        Gson gs = new Gson();
        product = gs.fromJson(params,ProductBean.class);
        result.put("Find Prodcut",productDAO.obtenerProducto(product.getId()));
        return SUCCESS;
    }

    public  String register() throws Exception{
        Gson gs = new Gson();
        product = gs.fromJson(params, ProductBean.class);
        result.put("Registrado",productDAO.guardarProducto(product));
        return SUCCESS;
    }

    public String update() throws Exception{
        Gson gs = new Gson();
        product = gs.fromJson(params,ProductBean.class);
        System.out.println("Mostrando el objeto producto en action");
        System.out.println(product);
        result.put("Updated",productDAO.modificarProducto(product));
        return SUCCESS;
    }

    public String delete() throws Exception{
        Gson gs = new Gson();
        product = gs.fromJson(params,ProductBean.class);
        result.put("Deleted",productDAO.eliminarProducto(product.getId()));
        System.out.println(result);
        return SUCCESS;
    }

public String reportProducts() throws  Exception{
        rs = productDAO.productDetails();

        try{
            while(rs.next()){
                ProductBean pr = new ProductBean();
                CategoryBean cr = new CategoryBean();
                pr.setName(rs.getString("nameProd"));
                pr.setPrice(rs.getDouble("price"));
                cr.setName(rs.getString("nameCat"));
                pr.setCategory_id(cr);
                productReport.add(pr);
                System.out.println(productReport);
            }


        }catch (Exception e){
            e.printStackTrace();
            return ERROR;
        }
        return SUCCESS;
}

    public ResultSet getRs() {
        return rs;
    }

    public void setRs(ResultSet rs) {
        this.rs = rs;
    }

    public Map<String, Object> getResult() {
        return result;
    }

    public void setResult(Map<String, Object> result) {
        this.result = result;
    }

    public ProductBean getProduct() {
        return product;
    }

    public void setProduct(ProductBean product) {
        this.product = product;
    }

    public ProductDAO getProductDAO() {
        return productDAO;
    }

    public void setProductDAO(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public ArrayList<ProductBean> getProductlist() {
        return productlist;
    }

    public void setProductlist(ArrayList<ProductBean> productlist) {
        this.productlist = productlist;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public List<ProductBean> getProductReport() {
        return productReport;
    }

    public void setProductReport(List<ProductBean> productReport) {
        this.productReport = productReport;
    }

}
