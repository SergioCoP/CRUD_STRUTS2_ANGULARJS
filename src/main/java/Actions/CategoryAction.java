package Actions;
import Model.CategoryBean;
import Model.CategoryDAO;
import Model.ProductBean;
import Model.ProductDAO;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class CategoryAction extends ActionSupport{
    String params;
    Map<String,Object> result = new HashMap<>();
    private CategoryBean category = new CategoryBean();
   CategoryDAO categoryDAO = new CategoryDAO();
    ArrayList<CategoryBean> categorylist = new ArrayList<>();

    public String findAll() throws Exception {
        categorylist = categoryDAO.obtenerCategorias();
        return SUCCESS;
    }

    public String findById() throws Exception {
        Gson gs = new Gson();
        category = gs.fromJson(params,CategoryBean.class);
        result.put("Find Category",categoryDAO.obtenerCategoria(category.getId()));
        return SUCCESS;
    }

    public  String register() throws Exception{
        Gson gs = new Gson();
       category = gs.fromJson(params, CategoryBean.class);
        result.put("Registrado",categoryDAO.guardarCategoria(category));
        return SUCCESS;
    }

    public String update() throws Exception{
        Gson gs = new Gson();
        category = gs.fromJson(params,CategoryBean.class);
        result.put("Updated",categoryDAO.modificarCategoria(category));
        return SUCCESS;
    }

    public String delete() throws Exception{
        Gson gs = new Gson();
        category = gs.fromJson(params,CategoryBean.class);
        result.put("Deleted",categoryDAO.eliminarCategoria(category.getId()));
        return SUCCESS;
    }

    public Map<String, Object> getResult() {
        return result;
    }

    public void setResult(Map<String, Object> result) {
        this.result = result;
    }


    public CategoryBean getCategory() {
        return category;
    }

    public void setCategory(CategoryBean category) {
        this.category = category;
    }

    public CategoryDAO getCategoryDAO() {
        return categoryDAO;
    }

    public void setCategoryDAO(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    public ArrayList<CategoryBean> getCategorylist() {
        return categorylist;
    }

    public void setCategorylist(ArrayList<CategoryBean> categorylist) {
        this.categorylist = categorylist;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }
}
