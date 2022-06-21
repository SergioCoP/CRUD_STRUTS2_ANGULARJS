package Actions;

import Model.EmpBean;
import Model.EmpDAO;
import com.google.gson.Gson;
import com.opensymphony.xwork2.ActionSupport;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class EmployeAction extends ActionSupport {
    String params;
    Map<String,Object> result = new HashMap<>();
    private EmpBean employe = new EmpBean();
    EmpDAO employeDao = new EmpDAO();
ArrayList<EmpBean> employelist = new ArrayList<>();

    public String findAll() throws Exception {
        employelist = employeDao.obtenerEmpleados();
        return SUCCESS;
    }

    public String findById() throws Exception {
        Gson gs = new Gson();
        employe = gs.fromJson(params,EmpBean.class);
        result.put("Find Employe",employeDao.obtenerEmpleado(employe.getId()));
        return SUCCESS;
    }

    public  String register() throws Exception{
        Gson gs = new Gson();
        employe = gs.fromJson(params, EmpBean.class);
        result.put("Registrado",employeDao.guardarEmpleado(employe));
        return SUCCESS;
    }

    public String update() throws Exception{
        Gson gs = new Gson();
        employe = gs.fromJson(params,EmpBean.class);
        result.put("Updated",employeDao.modificarEmpleado(employe));
        return SUCCESS;
    }

    public String delete() throws Exception{
        Gson gs = new Gson();
        employe = gs.fromJson(params,EmpBean.class);
        result.put("Deleted",employeDao.eliminarEmpleado(employe.getId()));
        return SUCCESS;
    }

    public Map<String, Object> getResult() {
        return result;
    }

    public void setResult(Map<String, Object> result) {
        this.result = result;
    }

    public EmpBean getEmploye() {
        return employe;
    }

    public void setEmploye(EmpBean employe) {
        this.employe = employe;
    }

    public ArrayList<EmpBean> getEmployelist() {
        return employelist;
    }

    public void setEmployelist(ArrayList<EmpBean> employelist) {
        this.employelist = employelist;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }
}
