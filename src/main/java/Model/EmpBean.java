package Model;

public class EmpBean {
    private int id;
    private String name,email;

    public EmpBean(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public EmpBean(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public EmpBean() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
